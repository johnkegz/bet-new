import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import TreeoTable from '../../components/Table';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    paper: {
        display: 'flex',
        overflowX: 'auto',
        width: '100%',
        marginTop: '20px',
        marginBottom: '20px',

        "@media (max-width: 768px)": {
            margin: '5%',
            width: '90%'
        },
    }
})

function DataTable(props: any) {
    const classes = useStyles()
    const { t } = useTranslation()
    const generateHeaderData = [
        {
            item: (
                <div
                    style={{
                        height: '60px',
                        overflowY: 'auto',
                    }}
                >
                    <div>{t('userName')}</div>
                    <div>{t('firstNameSurname')}</div>
                </div>
            ),
        },
        {
            item: t('organization'),
        },
        {
            item: t('projectsRoles'),
        },
        {
            item: t('status'),
        },
        {
            item: t('preferredLogin'),
        },
        {
            item: t('actions'),
        },
    ];
    

    const dataRow = (item: any) => {
        return ([
            {
                item: <div
                    style={{
                        height: '52px',
                        overflowY: 'auto',
                    }}
                >
                    <div>{item.username}</div>
                    <div>
                        {item.firstName} {item.lastName}
                    </div>
                </div>
            },

            {
                item: <div style={{
                    height: '52px',
                    overflow: 'auto',
                }}
                >
                    {filterUniqueUserOrganization(item).map(
                        (userProjectRole: any) => (
                            <div
                                key={userProjectRole.id}
                                style={{
                                    overflow: 'Hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {userProjectRole}
                            </div>
                        )
                    )}
                </div>
            },
            {
                item: <div
                style={{
                    height: '52px',
                    overflow: 'auto',
                }}
            >
                {item.userProject &&
                    item.userProject.map(
                        (userProjectRole: any) => (
                            <div
                                key={userProjectRole.id}
                                style={{
                                    overflow: 'Hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {userProjectRole.project !== null ? userProjectRole.project.name.toUpperCase() : ''} <b>:</b> {userProjectRole.role.name}
                            </div>
                        )
                    )}
            </div>
            },
            {
                item: statusCell(item)
            },
            {
                item: t(item.preferedLogin)
            }
        ])
    }

    const handleUserSummmary = (data) => {
        return console.log(data)
    }

    const redirectUrl = (item?: any) => {
        return `/users/edit/${item.id}`
    }

    return (
        <TableContainer component={Paper} className={classes.paper}>
            {props.data ? <TreeoTable
                data={props.data}
                // handleLabelType={handleLabelType}
                handleSetActivitySummary={handleUserSummmary}
                generateHeaderData={generateHeaderData}
                dataRow={dataRow}
                redirectUrl={redirectUrl}
                pageFetchStatus={"users"}
                setFetchDataStatus={props.setFetchDataStatus}
                tableStyle = { {
                    display: 'flex',
                    overflowX: 'scroll',
                    width: '100%',
                    paddingBottom: 50,
                    maxHeight: 750,
                }
                }
                measurementSummary={{}}
            /> : ""}
        </TableContainer>
    )
}

export default DataTable

export const statusCell = (data) => {
    const { t } = useTranslation()
    if (data.status === 'active') {
        return (
            <span
                style={{
                    paddingTop: '1px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    paddingBottom: '1px',
                    backgroundColor: '#B2E5C8',
                    borderRadius: '10px',
                }}
            >
                {t('active')}
            </span>
        )
    }

    if (data.status === 'inactive') {
        return (
            <span
                style={{
                    paddingTop: '1px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    paddingBottom: '1px',
                    backgroundColor: 'grey',
                    borderRadius: '10px',
                }}
            >
               {t('inactive')}
            </span>
        )
    }
    if (data.status === 'deactivated') {
        return (
            <span
                style={{
                    paddingTop: '1px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    paddingBottom: '1px',
                    backgroundColor: 'grey',
                    borderRadius: '10px',
                }}
            >
                {t('deactivated')}
            </span>
        )
    }
    if (data.status === 'pending') {
        return (
            <span
                style={{
                    paddingTop: '1px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    paddingBottom: '1px',
                    backgroundColor: '#F2F2F2',
                    borderRadius: '10px',
                }}
            >
                
                {t('pending')}
            </span>
        )
    }
}

const filterUniqueUserOrganization = (user: any) => {
    let result: any = []
    if (user.userProject && user.userProject.length !== 0) {
        for (let i of user.userProject) {

            if (!result.includes(i.role.organization.name)) {
                result.push(i.role.organization.name)
            }
        }
        return result
    }
    else {
        return []
    }
}
