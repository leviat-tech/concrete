
<style scoped lang="scss">
.separator {
    /* Prevent the browser's built-in drag from interfering */
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: col-resize;
    z-index: 69;
    height: 100%;
}

.seperator-img {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='30'><path d='M2 0 v30 M5 0 v30 M8 0 v30' fill='none' stroke='black'/></svg>");
  background-repeat: no-repeat;
  background-position: center;
}

</style>

<template>
  <div ref="containerRef" @mousemove="drag" @mouseup="endDrag" draggable="false" class="relative" :class="{ 'cursor-col-resize' : dragging }" >
    <slot/>
    
    <div
      class="separator absolute"
      :class="splitterClass"
      :style="splitterStyle"
      @mousedown="startDrag"
      @mousemove="drag"
      @mouseup="endDrag"
      @touchstart="startDrag"
      @touchmove="drag"
      @touchend="endDrag"
      
    ></div>
  </div>
</template>

<script setup>
  import { computed, ref, provide, onMounted  } from 'vue';


  const props = defineProps({
    splitter: {
      type: String,
      default: 'default',
      validator: (prop) => ['default', 'thick', 'thin'].includes(prop),
    },
  });

  const splitterClass = computed(() => {
    return {
      'thin': 'w-1 bg-gray-300',
      'thick': 'seperator-img w-3 bg-gray-300',
      'default': 'w-3 bg-transparent hover:bg-gray-300 hover:opacity-40',
    }[props.splitter];
  });

  const splitterStyle = computed(() => {
    const pos = panes.value[0]?.size;
    const width = {
      'thin': 4,
      'thick': 12,
      'default': 12,
    }[props.splitter];
    return`left: ${(pos-(width/2))}px`;
  })

  const emit = defineEmits(['resize']);

  let dragging = false;
  const activeProp = 'x';

  const startDrag = () => {
    dragging = true;
  }
  const endDrag = () => {
    dragging = false;
  }

  const drag = (e) => {
    if(dragging) {
      const currDrag = getCurrentMouseDrag(e)[activeProp];
      resizePanes(currDrag);
    }
  };

  const resizeObserver = new ResizeObserver(() => {

    panes.value[0].el.setAttribute('style', '');
    panes.value[1].el.setAttribute('style', '');
    resizePanes(dragPos);
  });

  const panes = ref([]);
  const containerRef = ref(null);
  let dragPos = null;
  
  onMounted(() => {
    resizePanes();
    resizeObserver.observe(containerRef.value);
  })
  
  const resizePanes = (currDrag) => {
    const elementWidth = containerRef.value?.offsetWidth;
    if(!elementWidth) return;
    if(elementWidth > panes.value.reduce((a, b) => a+b.max )) {
      // too much space for max values;
      console.error('resizable: too much space for pane max values')
    } else if(elementWidth < panes.value.reduce((a, b) => a+b.min )) {
      // not enough space for min values;
      console.error('resizable: not enough space for pane min values')
    } else if(panes.value[0] && panes.value[1]){
      
      let newDragPos = null;
      if(currDrag) {
        if(panes.value[0]?.max && (currDrag > panes.value[0].max)) {
          newDragPos = panes.value[0].max;
        } else if(panes.value[1]?.max && ((elementWidth-currDrag) > panes.value[1].max)) {
          newDragPos = elementWidth-panes.value[1].max;
        } else if(panes.value[0]?.min && (currDrag < panes.value[0].min)) {
          newDragPos = panes.value[0].min;
        } else if(panes.value[1]?.min && ((elementWidth-currDrag) < panes.value[1].min)) {
          newDragPos = elementWidth-panes.value[1].min;
        } else {
          newDragPos = currDrag;
        }
      } else {
        const distributedWidth = elementWidth / panes.value.length;
        if(panes.value[0]?.max && (distributedWidth > panes.value[0].max)) {
          newDragPos = panes.value[0].max;
        } else if(panes.value[1]?.max && (distributedWidth > panes.value[1].max)) {
          newDragPos = elementWidth-panes.value[1].max;
        } else if(panes.value[0]?.min && (distributedWidth < panes.value[0].min)) {
          newDragPos = panes.value[0].min;
        } else if(panes.value[1]?.min && (distributedWidth < panes.value[1].min)) {
          newDragPos = elementWidth-panes.value[1].min;
        } else {
          newDragPos = distributedWidth;
        }
      }
      updatePane(0, newDragPos)
      updatePane(1, elementWidth-newDragPos)
      dragPos = newDragPos;
      emit('resize', [panes.value[0].size, panes.value[1].size])
    }
  };

  const updatePane = (index, value) => {
    panes.value[index].size = value;
    panes.value[index].el.setAttribute('style', `width: ${panes.value[index].size}px`);
  }

  const getCurrentMouseDrag = (e) => {
    const rect = containerRef.value.getBoundingClientRect()
    const { clientX, clientY } = ('ontouchstart' in window && e.touches) ? e.touches[0] : e

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    }
  };


  const registerPane  = (pane)  => {
    panes.value.push(pane);  
    resizePanes();  
  };

  provide('resizable-pane',  {
    registerPane,
  })



</script>
