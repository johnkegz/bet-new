// import api from '../api';
import { createModel } from '@rematch/core'

interface stateType {
    selectedIds: string[];
    selectedItems: Array<{}>;
    mapLikedWithSelectedRows: boolean;
}

// interface errorType {
//     message: string;
//     statusCode: number;
//     response: {
//         data: {
//             message: "";
//             statusCode?: any;
//         }
//     };
// }

const initialState = {
    selectedIds: [],
    selectedItems: [],
    mapLikedWithSelectedRows: false,
}

const table = createModel<any>()({
    state: {...initialState},
    reducers: {
        selectedIds(state: stateType, data: string[]){
            return {
                ...state,
                selectedIds: data
            }
        },
        selectedItems(state: stateType, data: Array<{}>){
            return {
                ...state,
                selectedItems: data
            }
        },
        mapLikedWithSelectedRows(state: stateType, data: boolean){
            return {
                ...state,
                mapLikedWithSelectedRows: data
            }
        }
    },
    effects: (dispatch) => ({
        setSelectedIds: async (data: any, store: any) => {
            let currentData = store.table.selectedIds;
            dispatch.table.selectedIds([...currentData, data.selectedItemId])
        },
        removeSelectedIds: async (data: any, store: any) => {
            let currentData = store.table.selectedIds;
            const removeItemId = (arr, id) => {
                const index = arr.findIndex(obj => obj === id);
                if (index !== -1) {
                  arr.splice(index, 1);
                }
              };
            removeItemId(currentData, data.selectedItemId);
            dispatch.table.selectedIds(currentData)
        },
        setSelectedItems: async (data: any, store: any) => {
            let currentData = store.table.selectedItems;
            currentData = [...currentData, data.selectedItem];
            dispatch.table.selectedItems(currentData)
        },
        removeSelectedItems: async (data: any, store: any) => {
            let currentData = store.table.selectedItems;
            const removeItemById = (arr, id) => {
                const index = arr.findIndex(obj => obj.id === id);
                if (index !== -1) {
                  arr.splice(index, 1);
                }
              };
              
              removeItemById(currentData, data.selectedItemId);
            dispatch.table.selectedItems(currentData)
        },
        setCheckAllRows: async (data: any, store: any) => {
            let allData;
            if(data.checkAll){
                if(data.tableType == 'activities'){
                  allData = [...store.activities.activitiesIds];
                }

                if(data.tableType == 'plots'){
                    allData = [...store.plots.allPlotsIds];
                }
               
                dispatch.table.selectedIds([...allData.map(item => item.id)])
                dispatch.table.selectedItems(allData)
                dispatch.table.mapLikedWithSelectedRows(true);
            }
            if(!data.checkAll){
                dispatch.table.selectedIds([])
                dispatch.table.selectedItems([])
                dispatch.table.mapLikedWithSelectedRows(false);
            }
        },
        setClearCheckAllRows: async () => {
            dispatch.table.selectedIds([])
            dispatch.table.selectedItems([])
        },
        setMapLikedWithSelectedRows: async (data) => {
            dispatch.table.mapLikedWithSelectedRows(data.status);
        },
    }),
});

export default table;
