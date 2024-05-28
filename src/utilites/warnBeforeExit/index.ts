import { useDispatch } from 'react-redux';

export const checkForWarn = (obj) => {
    if (obj.message) return obj.message;
    return '';
};

export const useOpenWarnModal = () => {
    const dispatch = useDispatch();
    const handleOpenWarnModal = (urlPassed, openStatus) =>
        dispatch.general.setOpenWarnModal({
            openWarnModal: {
                url: urlPassed,
                status: openStatus,
            },
        });

    return handleOpenWarnModal;
};

export const useSetWarnBeforeExit = () => {
    const dispatch = useDispatch();
    const callBack = (message, data, func) =>{
        dispatch.general.setWarnBeforeExit({
            options: {
                message: message,
                data: data,
                saveChanges: func,
            },
        });}

    return callBack;
};
