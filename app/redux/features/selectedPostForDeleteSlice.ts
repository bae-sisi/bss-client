import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SelectedPostIdsState = {
  selectedPostIds: Array<string>;
};

type initialState = {
  value: SelectedPostIdsState;
};

const initialState = {
  value: {
    selectedPostIds: [],
  } as SelectedPostIdsState,
} as initialState;

export const selectedPostIds = createSlice({
  name: 'selectSubjectInModal',
  initialState,
  reducers: {
    storeSelectedPostIds: (
      state,
      action: PayloadAction<SelectedPostIdsState>
    ) => {
      return {
        value: {
          selectedPostIds: action.payload.selectedPostIds,
        },
      };
    },

    initSelectedPostIds: () => {
      return initialState;
    },
  },
});

export const { storeSelectedPostIds, initSelectedPostIds } =
  selectedPostIds.actions;
export default selectedPostIds.reducer;
