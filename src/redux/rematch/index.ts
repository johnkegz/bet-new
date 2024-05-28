import { init, RematchDispatch, RematchRootState } from '@rematch/core'
import { createLogger } from 'redux-logger';
import { models, RootModel } from '../models'

/** Plugins **/
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading'

type FullModel = ExtraModelsFromLoading<RootModel>

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger);
}

export const store = init<RootModel, FullModel>({
    models,
    plugins: [
        loadingPlugin(),
    ],
    ...middlewares
})

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>
