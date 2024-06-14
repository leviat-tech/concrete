<template>

    <div 
        @click="selectFile()"
        class="inline-flex items-center border border-steel text-center h-24 w-24 rounded-md border-2 relative cursor-pointer overflow-hidden justify-center"
        :class="props.selected ? 'bg-indigo fill-white' : ' bg-white fill-gray-500'">
        <div>
            <div class="flex justify-center items-center">
                <slot>

                <svg 
                    class="h-12 w-12 text-white font-bold hover:cursor-pointer"
                    :class="props.selected ? 'fill-white' : 'fill-steel-dark'"
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 -960 960 960" 
                    >
                    
                    <path d="M263.72-96Q234-96 213-117.15T192-168v-624q0-29.7 21.15-50.85Q234.3-864 264-864h312l192 192v504q0 29.7-21.16 50.85Q725.68-96 695.96-96H263.72ZM528-624v-168H264v624h432v-456H528ZM264-792v189-189 624-624Z"/>
                    <g transform="translate(400, -475)">
                        <rect
                            x="0" y="0"
                            width="450"
                            height="225"
                            class="h-50 w-50"
                            rx="25"
                            >
                        </rect>

                        <text 
                            x="225" y="127"
                            font-size="10rem"
                            :class="props.selected ? 'fill-indigo' : 'fill-white'"
                            text-anchor="middle"
                            dominant-baseline="middle"
                            >

                            {{ tidyExtension(props.extension) }}

                        </text>
                    </g>
                </svg>

                </slot>
            </div>
            <div 
                class="text-center font-semibold uppercase font-sans text-sm h-6 flex justify-center items-center group-hover:text-white group-hover:bg-primary"
                :class="props.selected ? 'text-white' : 'text-gray-500'"
                >
                
                {{ props.label }}
            </div>
        </div>
    </div>
</template>


<script setup>
    const props = defineProps({
        selected: { 
            Type: Boolean, 
            default: false 
        },
        label: {
            Type: String,
            default: 'Label'
        },
        extension: {
            Type: String,
            default: '.ext'
        }
    })


    const emit = defineEmits(['select'])
    
    const tidyExtension = (e) => {
        var extension = e;
        extension = extension.toUpperCase().trim().replace('.', '');
        return extension;
    }

    const selectFile = () => {
        emit('select')
    }

</script>
