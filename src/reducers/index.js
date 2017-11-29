import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants';
import { bake_cookie, read_cookie } from 'sfcookies';

const reminder = (action) => {
  let { text, dueDate } = action;

  return {
    id: Math.random(),
    text,
    dueDate
  }
}

const removeById = (state = [], id) => {
  const reminders = state.filter(reminder => reminder.id !== id);
  return reminders;
}

const reminders = (state = [], action) => {
  let remindersList = null;
  state = read_cookie('remindersList');

  switch(action.type) {
    case ADD_REMINDER:
      remindersList = [...state, reminder(action)];

      bake_cookie('remindersList', remindersList);
      console.log('Reminders as state', remindersList);
      return remindersList;
    case DELETE_REMINDER:
      remindersList = removeById(state, action.id);
      bake_cookie('remindersList', remindersList);
      return remindersList;
    case CLEAR_REMINDERS:
      remindersList = [];
      bake_cookie('remindersList', remindersList);
      return remindersList;
    default:
      return state;
  }
}

export default reminders;
