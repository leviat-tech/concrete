<template>
  <div class="flex flex-col w-full overflow-x-auto">
    <table class="table-auto" :class="tableClass">
      <tbody>
        <tr class="text-left border-b text-xs text-base-600">
          <th v-if="$slots.prepend" :class="prependClass" />
          <th v-for="col in columns" :key="col.id" :class="headerClass || 'pb-3 pl-1'">
            <span
              :class="{ 'cursor-pointer': col.sortable }"
              @click="() => col.sortable && toggleSort(col.id)"
            >
              <slot :name="`${col.id}.header`">
                <span v-if="col.label?.html" v-html="col.label?.html"></span>
                <span v-else :class="col.label || 'uppercase'">
                  {{ col.label || startCase(col.id) }}
                </span>
              </slot>
            </span>
            <span v-if="localSort[col.id] === 'asc'"> &#8593; </span>
            <span v-else-if="localSort[col.id] === 'desc'"> &#8595; </span>
            <span v-else-if="col.sortable" class="text-base-400"> &#8645; </span>
          </th>
          <th v-if="attrs.onEdit || attrs.onAdd" class="w-12" />
          <th v-if="attrs.onEdit || attrs.onAdd || attrs.onDelete" class="w-12" />
          <th v-if="$slots.append" :class="appendClass" />
        </tr>

        <tr
          v-for="(row, i) in _rows"
          :key="`row${i}`"
          :class="[
            attrs.onClick && editingRow?._index !== i && 'cursor-pointer',
            editingRow?._index === i && 'bg-base-100',
            rowClass || 'border-b',
          ]"
          @click="editingRow?._index !== i && emit('click', row)"
        >
          <td v-if="$slots.prepend">
            <slot name="prepend" v-bind="row" />
          </td>

          <td v-for="(col, j) in columns" :class="cellClass || 'py-3 px-2'" :key="`col${j}`">
            <slot
              :name="col.id"
              :value="editingRow?._index === i ? editingRow[col.id] : row[col.id]"
              @edit="editingRow[col.id] = $event"
              :is-editing="editingRow?._index === i"
              :error="(editingRow?._index === i && errors[col.id]) || undefined"
              :row="row"
            >
              {{ col?.formatter?.(row[col.id], row) || get(row, col.id) }}
            </slot>
          </td>

          <td v-if="editingRow?._index === i">
            <span class="cursor-pointer" @click.stop="saveEdit">
              <c-icon type="save" size="sm" />
            </span>
          </td>
          <td v-else-if="attrs.onEdit && editingRow?.index !== i">
            <span class="cursor-pointer" @click.stop="beginEditingRow(row, i)">
              <c-icon type="edit" size="sm" />
            </span>
          </td>

          <td v-if="editingRow?._index === i">
            <span class="cursor-pointer" @click.stop="editingRow = null">
              <c-icon type="cancel" size="sm" />
            </span>
          </td>

          <td v-else-if="attrs.onDelete">
            <div class="flex items-center">
              <span class="cursor-pointer" @click.stop="emit('delete', row)">
                <c-icon type="trash" size="sm" />
              </span>
            </div>
          </td>

          <td v-if="$slots.append">
            <slot name="append" v-bind="row" />
          </td>
        </tr>

        <tr v-if="addingRow" class="border-b bg-base-100">
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
              <c-icon type="save" size="sm" />
            </span>
          </td>
          <td>
            <span @click="addingRow = null" class="cursor-pointer">
              <c-icon type="cancel" size="sm" />
            </span>
          </td>
        </tr>
      </tbody>
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
      @clickPrevious="selectPageNumber(localPageNumber - 1)"
      @clickNext="selectPageNumber(localPageNumber + 1)"
      @clickPageNumber="selectPageNumber"
      :page-number="localPageNumber"
      :page-limit="pageLimit"
      :result-count="server ? resultCount : rows.length"
    />
  </div>
</template>

<script setup lang="ts">
import { omit, orderBy, get, startCase } from 'lodash-es';
import { ref, computed, watch, useAttrs } from 'vue';
import CIcon from '../Icon/Icon.vue';
import CPagination from './Pagination.vue';

// TODO: add priority when sorting w/ multiple columns
const props = withDefaults(
  defineProps<{
    rows?: any[];
    sort?: any;
    columns?: Array<{ id: string; label?: string }> | Array<string>;
    server?: boolean;
    rowClass?: string;
    pageLimit?: number;
    cellClass?: string;
    pageNumber?: number;
    tableClass?: string;
    resultCount?: number;
    headerClass?: string;
    appendClass?: string;
    prependClass?: string;
  }>(),
  {
    server: false,
  }
);

const emit = defineEmits(['change', 'click']);
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

const _columns = computed(() => {
  return props.columns.map((col) => (typeof col === 'string' ? { id: col } : col));
});

const localSort = ref(
  props.sort || _columns.value.reduce((acc, col) => ({ ...acc, [col.id]: col.defaultSort }), {})
);

watch(
  () => props.sort,
  () => (localSort.value = props.sort)
);

function toggleSort(colId) {
  const currentSort = localSort.value[colId];
  if (currentSort === 'asc') {
    localSort.value[colId] = 'desc';
  } else if (currentSort === 'desc') {
    localSort.value[colId] = null;
  } else {
    localSort.value[colId] = 'asc';
  }
  emit('change', { sort: localSort.value, pageNumber: localPageNumber.value });
}

const localPageNumber = ref(props.pageNumber || 1);
watch(
  () => props.pageNumber,
  () => (localPageNumber.value = props.pageNumber)
);

function selectPageNumber(newPageNumber) {
  localPageNumber.value = newPageNumber;
  emit('change', { sort: localSort.value, pageNumber: localPageNumber.value });
}

const _rows = computed(() => {
  if (props.server) {
    return props.rows;
  }
  const sortColIds = _columns.value.filter((col) => localSort.value[col.id]).map((col) => col.id);

  const sortOrders = sortColIds.map((colId) => localSort.value[colId]);
  const sorted = orderBy(props.rows, sortColIds, sortOrders);

  if (props.pageLimit) {
    const offset = (localPageNumber.value - 1) * props.pageLimit;
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
