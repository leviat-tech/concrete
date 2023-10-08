<template>
  <div class="flex flex-col w-full overflow-x-auto">
    <table class="table-auto" :class="tableClass">
      <tr class="text-left border-b text-xs text-gray-600">
        <th v-if="$slots.prepend" :class="prependClass" />
        <th
          v-for="col in columns"
          :key="col.id"
          :class="headerClass || 'pb-3 pl-1'"
        >
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
          <span v-else-if="col.sortable" class="text-gray-400"> &#8645; </span>
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
          editingRow?._index === i && 'bg-gray-100',
          rowClass || 'border-b',
        ]"
        @click="editingRow?._index !== i && emit('click', row)"
      >
      <td v-if="$slots.prepend">
          <slot name="prepend" v-bind="row" />
        </td>

        <td v-for="(col, j) in columns" :key="`col${j}`">
          <slot
            :name="col.id"
            :id="col.id + '_' + row.id"
            :value="(editingRow?._index === i ? editingRow[col.id] : row[col.id])"
            :is-cells-editable="props.isCellsEditable"
            :is-editing-row="isEditingRow(i) && !props.isCellsEditable"
            :is-editing-cell="isEditingCell(i, col.id) && props.isCellsEditable"
            :error="(editingRow?._index === i && errors[col.id]) || undefined"
            :row="row"
            @edit="editingRow[col.id] = $event"
            @click="beginEditingCell(row, i, col.id, row.id)"
            @keydown="onKeyDown($event, col.id + '_' + row.id)"
          >
          {{ col?.formatter?.(row[col.id], row) || get(row, col.id)  }}
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

      <tr v-if="addingRow" class="border-b bg-gray-100">
        <td v-if="$slots.prepend" />

        <td v-for="(col, j) in columns" :key="`col${j}`" class="py-3 pl-1">
          <slot
            :name="col.id"
            :value="addingRow[col.id]"
            :isEditingRow="true"
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

<script setup>
import { omit, orderBy, get, startCase } from "lodash-es";
import { ref, computed, watch, useAttrs } from "vue";
import CIcon from "../Icon/Icon.vue";
import CPagination from "./Pagination.vue";

// TODO: add priority when sorting w/ multiple columns
const props = defineProps({
  rows: Array,
  columns: Array,
  server: Boolean,
  resultCount: Number, // only needed for server side
  pageNumber: Number, // only needed for server side
  sort: Object, // only needed for server side
  pageLimit: Number,
  prependClass: String,
  appendClass: String,
  rowClass: String,
  cellClass: String,
  headerClass: String,
  tableClass: String,
  isCellsEditable: Boolean
});

function onBlur() {}

const emit = defineEmits(["change", "click"]);
const attrs = useAttrs();

const editingCell = ref(null);
const editingRow = ref(null);
const addingRow = ref(null);
const errors = ref({});


const onKeyDown = (e, id) => {
  console.log(props.isCellsEditable);
  console.log(e.key);
  if (e.key === 'Escape') {
    editingCell.value = null;
  }
  // if (editingCell.value?._elementId === id) {
  //   return;
  // }
  if (e.key.startsWith("Arrow")) {
    // disable the key arrow press window scrolling
    // but can't find a way to enable it...
    window.addEventListener(
      "keydown",
      function (e) {
        if (
          ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) >
          -1
        ) {
          e.preventDefault();
        }
      },
      false
    );
    onArrowKeys(e.key);
  }
  return e.key;
};

function onArrowKeys(key) {
  const cellId = getNextCellId(
    props.columns,
    _rows._value,
    document.activeElement.id,
    key
  );
  document.getElementById(cellId).focus();
}

function getNextCellId(columns, rows, selectedId, arrowKeyDirection) {
  const colId = getColId(columns, selectedId, arrowKeyDirection);
  const rowId = getRowId(rows, selectedId, arrowKeyDirection);
  return colId + "_" + rowId;
}

function getColId(array, selectedId, arrowKeyDirection) {
  const idDir = getColIdDir(arrowKeyDirection);
  let arrayIdCurr;
  for (let i = 0; i < array.length; i++) {
    if (selectedId.startsWith(array[i].id + "_")) {
      arrayIdCurr = i;
      break;
    }
  }
  return getIdDestination(array, arrayIdCurr, idDir);
}

function getRowId(array, selectedId, arrowKeyDirection) {
  const idDir = getRowIdDir(arrowKeyDirection);
  let arrayIdCurr;
  for (let i = 0; i < array.length; i++) {
    if (selectedId.endsWith("_" + array[i].id)) {
      arrayIdCurr = i;
      break;
    }
  }
  return getIdDestination(array, arrayIdCurr, idDir);
}

function getColIdDir(arrowKeyDirection) {
  switch (arrowKeyDirection) {
    case "ArrowLeft":
      return -1;
    case "ArrowRight":
      return 1;
    default:
      return 0;
  }
}

function getRowIdDir(arrowKeyDirection) {
  switch (arrowKeyDirection) {
    case "ArrowUp":
      return -1;
    case "ArrowDown":
      return 1;
    default:
      return 0;
  }
}

function getIdDestination(array, arrayIdCurr, idDir) {
  const idDest = arrayIdCurr + idDir;
  const arrayIdDest =
    idDest >= 0 && idDest <= array.length - 1 ? idDest : arrayIdCurr;
  return array[arrayIdDest].id;
}

function beginAddingRow() {
  addingRow.value = {};
  editingRow.value = null;
}

function isEditingRow(i) {
  return editingRow.value?._index === i;
}

function isEditingCell(i, colId) {
  return props.isCellsEditable && editingCell.value?._index === i && editingCell.value?._colId === colId;
}

function beginEditingRow(row, index) {
  editingRow.value = { ...row, _index: index };
  addingRow.value = null;
}
function beginEditingCell(row, index, colId, rowId) {
  editingCell.value =  { ...row, _index: index, _colId: colId, _elementId: colId + '_' + rowId}
  editingRow.value = null
  addingRow.value = null;
}
function saveEdit() {
  const data = omit(editingRow.value, "_index");
  const success = () => (editingRow.value = null);
  const error = (_errors) => {
    errors.value = _errors;
  };
  emit("edit", { data, success, error });
}

function saveAdd() {
  const data = addingRow.value;
  const success = () => (addingRow.value = null);
  const error = (_errors) => (errors.value = _errors);
  emit("add", { data, success, error });
}

const _columns = computed(() => {
  return props.columns.map((col) =>
    typeof col === "string" ? { id: col } : col
  );
});

const localSort = ref(
  props.sort ||
    _columns.value.reduce(
      (acc, col) => ({ ...acc, [col.id]: col.defaultSort }),
      {}
    )
);

watch(
  () => props.sort,
  () => (localSort.value = props.sort)
);

function toggleSort(colId) {
  const currentSort = localSort.value[colId];
  if (currentSort === "asc") {
    localSort.value[colId] = "desc";
  } else if (currentSort === "desc") {
    localSort.value[colId] = null;
  } else {
    localSort.value[colId] = "asc";
  }
  emit("change", { sort: localSort.value, pageNumber: localPageNumber.value });
}

const localPageNumber = ref(props.pageNumber || 1);
watch(
  () => props.pageNumber,
  () => (localPageNumber.value = props.pageNumber)
);

function selectPageNumber(newPageNumber) {
  localPageNumber.value = newPageNumber;
  emit("change", { sort: localSort.value, pageNumber: localPageNumber.value });
}

const _rows = computed(() => {
  if (props.server) {
    return props.rows;
  }
  const sortColIds = _columns.value
    .filter((col) => localSort.value[col.id])
    .map((col) => col.id);

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
