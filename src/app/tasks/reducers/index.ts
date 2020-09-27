import { ActionReducerMap } from '@ngrx/store';
import { taskReducer } from '../task.reducer';

export const reducers: ActionReducerMap<any> = {
  task: taskReducer
}

