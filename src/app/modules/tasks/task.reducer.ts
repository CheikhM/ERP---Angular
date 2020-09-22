import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { Task } from './models/task.model';
import * as actions from './task.actions';
// Entity adapter
export const taskAdapter = createEntityAdapter<Task>();
export interface State extends EntityState<Task> {}
const defaultTask = {
    ids: ['1'],
    entities: {
      '1': {
        id: 1,
        title: 'Hello',
        description: 'Test description',
        priority: 'Test',
        status: '',
        user: null,
        createdAt: '',
        comments: null
      }
    }
}
export const initialeState: State = taskAdapter.getInitialState(defaultTask);


// Reducer
export function taskReducer(
  state: State = initialeState,
  action: actions.TaskActions) {

  switch(action.type) {

    case actions.CREATE:
      return taskAdapter.addOne(action.task, state);

    case actions.UPDATE:
      return taskAdapter.updateOne({
        id: action.id,
        changes: action.changes
      }, state);

    case actions.DELETE:
      return taskAdapter.removeOne(action.id, state);

    default:
      return state;
  }

}


// Create the default selector

export const getTaskState = createFeatureSelector<State>('task')

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = taskAdapter.getSelectors(getTaskState);
