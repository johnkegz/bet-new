import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { VariantType, useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

function ConfirmEmail() {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const router = useHistory();
    const { t } = useTranslation();
    const { id } = useParams<any>();

    const handleNotification = (message: string, variant: VariantType) => {
        enqueueSnackbar(message, { variant });
    };

    useEffect(() => {
        const userID = id;
        dispatch.users.verifyEmail({
            user: {
                id: userID,
            },
            onSuccess: () => {
                handleNotification(t("accountVerified"), "success");
                router.push('/');
            },
            onError: () => {
                handleNotification(t("verificationIssue"), "error");
            },
        });
    }, []);

    return (
        <div style={{ margin: 'auto' }}>
            {id}
        </div>
    );
}

export default ConfirmEmail;
