import React from 'react';
import { Route } from 'react-router-dom';

const RouteWithLayout = (props: { [x: string]: any; layout: any; component: any; }) => {
    const { layout: Layout, component: Component, ...rest } = props;
    return (
        <Route
            {...rest}
            render={(matchProps) => (
                <Layout>
                    <Component {...matchProps} />
                </Layout>
            )}
        />
    );
};

export default RouteWithLayout;
