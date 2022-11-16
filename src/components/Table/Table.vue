<template>
  <div class="flex flex-col">
    <table class="table-fixed w-full">

      <tr class="text-left border-b text-xs text-gray-600">
        <th v-if="$slots.prepend" :class="prependClass"/>
        <th v-for="col in columns" :key="col.id" :class="headerClass || 'pb-3 pl-1'">
          <span
            :class="{ 'cursor-pointer': col.sortable }"
            @click="() => col.sortable && toggleSort(col.id)"
          >
            <slot :name="`${col.id}.header`">
              <span :class="col.label || 'uppercase'"> {{ col.label || col.id }} </span>
            </slot>
          </span>
          <span v-if="sort[col.id] === 'asc'"> &#8593; </span>
          <span v-else-if="sort[col.id] === 'desc'"> &#8595; </span>
          <span v-else-if="col.sortable" class="text-gray-400"> &#8645; </span>
        </th>
        <th v-if="attrs.onEdit || attrs.onAdd" class="w-12"/>
        <th v-if="attrs.onEdit || attrs.onAdd || attrs.onDelete" class="w-12"/>
        <th v-if="$slots.append" :class="appendClass"/>
      </tr>

      <tr
        v-for="(row, i) in _rows"
        :key="`row${i}`"
        :class="[
          attrs.onClick && editingRow?._index !== i && 'cursor-pointer',
          editingRow?._index === i && 'bg-gray-100',
          rowClass || 'border-b'
        ]"
        @click="editingRow?._index !== i && emit('click', row)"
      >
        <td v-if="$slots.prepend">
          <slot name="prepend" v-bind="row"/>
        </td>

        <td v-for="(col, j) in columns" :class="cellClass || 'py-3 px-2'" :key="`col${j}`"
            @click="onClickCell(row, i, $event)"
        >
          <slot
            :name="col.id"
            :value="editingRow?._index === i ? editingRow[col.id] : row[col.id]"
            @edit="editingRow[col.id] = $event"
            :is-editing="editingRow?._index === i"
            :error="(editingRow?._index === i && errors[col.id]) || undefined"
            :row="row"
          >
            {{ row[col.id] }}
          </slot>
        </td>

        <td v-if="editingRow?._index === i">
          <span class="cursor-pointer" @click.stop="saveEdit">
            <c-icon type="save" size="sm"/>
          </span>
        </td>
        <td v-else-if="attrs.onEdit && editingRow?.index !== i">
          <span class="cursor-pointer" @click.stop="beginEditingRow(row, i)">
            <c-icon type="edit" size="sm"/>
          </span>
        </td>

        <td v-if="editingRow?._index === i">
          <span class="cursor-pointer" @click.stop="editingRow = null">
            <c-icon type="cancel" size="sm"/>
          </span>
        </td>

        <td v-else-if="attrs.onDelete">
          <div class="flex items-center">
            <span class="cursor-pointer" @click.stop="emit('delete', row)">
              <c-icon type="trash" size="sm"/>
            </span>
          </div>
        </td>

        <td v-if="$slots.append">
          <slot name="append" v-bind="row"/>
        </td>
      </tr>

      <tr v-if="addingRow" class="border-b bg-gray-100">
        <td v-if="$slots.prepend" />

        <td v-for="(col, j) in columns" :key="`col${j}`" class="py-3 pl-1">
          <slot
            :name="col.id"
            :value="addingRow[col.id]"
            :isEditing="true"
            @edit="addingRow[col.id] = $event"
            :error="(addingRow && errors[col.id]) || undefined"
            :row="addingRow"
          />
        </td>
        <td>
          <span @click="saveAdd" class="cursor-pointer">
            <c-icon type="save" size="sm"/>
          </span>
        </td>
        <td>
          <span @click="addingRow = null" class="cursor-pointer">
            <c-icon type="cancel" size="sm"/>
          </span>
        </td>
      </tr>
    </table>
    <div
      v-if="attrs.onAdd && !addingRow"
      @click="beginAddingRow"
      class="py-3 pl-1 border-b cursor-pointer"
    >
      &#43; Add Row
    </div>
    <CPagination
      class="pt-3"
      v-if="pageLimit"
      @clickPrevious="selectPageNumber(pageNumber - 1)"
      @clickNext="selectPageNumber(pageNumber + 1)"
      @clickPageNumber="selectPageNumber"
      :page-number="pageNumber"
      :page-limit="pageLimit"
      :result-count="resultCount || rows.length"
    />
  </div>
</template>

<script setup>
import { omit, orderBy } from 'lodash-es';
import { ref, computed, watch, useAttrs, nextTick } from 'vue';
import CIcon from '../Icon/Icon.vue';
import CPagination from './Pagination.vue';

const props = defineProps({
  rows: Array,
  columns: Array,
  resultCount: Number, // only needed for server side
  pageLimit: Number,
  prependClass: String,
  appendClass: String,
  rowClass: String,
  cellClass: String,
  headerClass: String,
});

const emit = defineEmits(['click', 'change']);
const attrs = useAttrs();

const editingRow = ref(null);
const addingRow = ref(null);
const errors = ref({});

function beginAddingRow() {
  addingRow.value = {};
  editingRow.value = null;
}

function beginEditingRow(row, index) {
  editingRow.value = { ...row, _index: index };
  addingRow.value = null;
}

function saveEdit() {
  const data = omit(editingRow.value, '_index');
  const success = () => (editingRow.value = null);
  const error = (_errors) => {
    errors.value = _errors;
  };
  emit('edit', { data, success, error });
}

function saveAdd() {
  const data = addingRow.value;
  const success = () => (addingRow.value = null);
  const error = (_errors) => (errors.value = _errors);
  emit('add', { data, success, error });
}

const sort = ref(
  props.columns.reduce((acc, col) => ({ ...acc, [col.id]: col.defaultSort }))
);

function toggleSort(colId) {
  const currentSort = sort.value[colId];
  if (currentSort === 'asc') {
    sort.value[colId] = 'desc';
  } else if (currentSort === 'desc') {
    sort.value[colId] = null;
  } else {
    sort.value[colId] = 'asc';
  }
  emit('change', { sort: sort.value, pageNumber: pageNumber.value });
}

const pageNumber = ref(1);

function selectPageNumber(newPageNumber) {
  pageNumber.value = newPageNumber;
  emit('change', { sort: sort.value, pageNumber: pageNumber.value });
}

const _rows = computed(() => {
  // if server side, just return rows
  const sortColIds = props.columns
    .filter((col) => sort.value[col.id])
    .map((col) => col.id);

  const sortOrders = sortColIds.map((colId) => sort.value[colId]);
  const sorted = orderBy(props.rows, sortColIds, sortOrders);

  if (props.pageLimit) {
    const offset = (pageNumber.value - 1) * props.pageLimit;
    return sorted.slice(offset, offset + props.pageLimit);
  } else {
    return sorted;
  }
});

watch(
  () => _rows.value,
  () => (editingRow.value = null)
);

watch(
  () => [editingRow.value, addingRow.value],
  () => (errors.value = {})
);
</script>

<style scoped></style>
