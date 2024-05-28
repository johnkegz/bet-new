// import api from '../api';
import { createModel } from '@rematch/core'

interface stateType {
    selectedIds: string[];
    selectedItems: Array<{}>;
    mapLikedWithSelectedRows: boolean;


    //New
    allChecked: boolean;
    totalSelected: number;

    notIn: string[];

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

    //New
    allChecked: false,
    totalSelected: 0,
    notIn: []
}

const table2 = createModel<any>()({
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
        },
        setChecked(state: stateType, data: any){
            return {
                ...state,
                allChecked: data.allChecked,
                totalSelected: data.totalSelected
            }
        },
        setNotIn(state: stateType, data: any){
            return {
                ...state,
                notIn: data
            }
        },
    },
    effects: (dispatch) => ({
        // setSelectedIds: async (data: any, store: any) => {
        //     let currentData = store.table.selectedIds;
        //     dispatch.table.selectedIds([...currentData, data.selectedItemId])
        // },
        // removeSelectedIds: async (data: any, store: any) => {
        //     let currentData = store.table.selectedIds;
        //     const removeItemId = (arr, id) => {
        //         const index = arr.findIndex(obj => obj === id);
        //         if (index !== -1) {
        //           arr.splice(index, 1);
        //         }
        //       };
        //     removeItemId(currentData, data.selectedItemId);
        //     dispatch.table.selectedIds(currentData)
        // },
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
        // setCheckAllRows: async (data: any, store: any) => {
        //     let allData;
        //     if(data.checkAll){
        //         if(data.tableType == 'activities'){
        //           allData = [...store.activities.activitiesIds];
        //         }

        //         if(data.tableType == 'plots'){
        //             allData = [...store.plots.allPlotsIds];
        //         }
               
        //         dispatch.table.selectedIds([...allData.map(item => item.id)])
        //         dispatch.table.selectedItems(allData)
        //         dispatch.table.mapLikedWithSelectedRows(true);
        //     }
        //     if(!data.checkAll){
        //         dispatch.table.selectedIds([])
        //         dispatch.table.selectedItems([])
        //         dispatch.table.mapLikedWithSelectedRows(false);
        //     }
        // },
        // setClearCheckAllRows: async () => {
        //     dispatch.table.selectedIds([])
        //     dispatch.table.selectedItems([])
        // },
        setMapLikedWithSelectedRows: async (data) => {
            dispatch.table.mapLikedWithSelectedRows(data.status);
        },
        setCheckAll: async (data: any) => {
            if(data.checkedAll){
                const newSelection = {
                    allChecked: true,
                    //TODO: Change to specific page
                    totalSelected: data.totalItems
                }
                dispatch.table2.setChecked(newSelection);
                dispatch.table2.setNotIn([]);
                dispatch.table2.selectedIds([])
            }
            else{
                const newSelection = {
                    allChecked: false,
                    totalSelected: 0
                }
                dispatch.table2.setChecked(newSelection);
                dispatch.table2.setNotIn([]);
                dispatch.table2.selectedIds([])
            }
        },
        setCheckOne: async (data: any, _store: any) => {
            const totalItems = data.totalItems;
            const rowId = data.id.toString();
            if(data.checked) {
                if(_store.table2.notIn.length !== 0){
                const newNotIn = [..._store.table2.notIn, rowId]
                const finalData = newNotIn.filter(item => item !== rowId);
                dispatch.table2.setNotIn(finalData);
                if(finalData.length === 0) {
                    const newSelection = {
                    allChecked: true,
                    //TODO: Change to specific page
                    totalSelected: totalItems
                    }
                    dispatch.table2.setChecked(newSelection);
                }
            }
            else{
                const newSelectedIds = [..._store.table2.selectedIds, rowId]
                const newTotalChecked = newSelectedIds.length;
                dispatch.table2.selectedIds(newSelectedIds)
                //TODO: Change to specific page
                if(newTotalChecked === totalItems) {
                    const newSelection = {
                    allChecked: true,
                    //TODO: Change to specific page
                    totalSelected: totalItems
                    }
                    dispatch.table2.setChecked(newSelection);
                }
                else {
                    const newSelection = {
                    allChecked: false,
                    totalSelected: newTotalChecked
                    }
                    dispatch.table2.setChecked(newSelection);
                }
            }
            }
            else {
                if(_store.table2.notIn.length !== 0 || _store.table2.allChecked){
                const newNotIn = [..._store.table2.notIn, rowId]
                dispatch.table2.setNotIn(newNotIn);
                const newSelection = {
                    allChecked: false,
                    //TODO: Get real data
                    totalSelected: totalItems-newNotIn.length
                }
                dispatch.table2.setChecked(newSelection);
            }
            else {
                const newSelectedIds = [..._store.table2.selectedIds]
                const newIds = newSelectedIds.filter(item => item !== rowId);
                const newSelection = {
                    allChecked: false,
                    totalSelected: newIds.length
                }
                dispatch.table2.setChecked(newSelection);
                dispatch.table2.selectedIds(newIds)
            }
            }
        },
        resetTable2: async () => {
            dispatch.table2.setChecked({
                    allChecked: false,
                    totalSelected: 0
                });
            dispatch.table2.selectedIds([])
            dispatch.table2.setNotIn([]);
        },
    }),
});

export default table2;
