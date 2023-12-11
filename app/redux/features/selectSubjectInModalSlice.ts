import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubjectInfo {
  lectureName: string;
  profName: string;
}

type SubjectState = SubjectInfo & {
  isSubjectSelected: boolean;
};

type initialState = {
  value: SubjectState;
};

const initialState = {
  value: {
    lectureName: '',
    profName: '',
    isSubjectSelected: false,
  } as SubjectState,
} as initialState;

export const selectSubjectInModal = createSlice({
  name: 'selectSubjectInModal',
  initialState,
  reducers: {
    storeSubjectInfo: (state, action: PayloadAction<SubjectInfo>) => {
      return {
        value: {
          lectureName: action.payload.lectureName,
          profName: action.payload.profName,
          isSubjectSelected: true,
        },
      };
    },

    initStoreSubjectInfo: () => {
      return initialState;
    },
  },
});

export const { storeSubjectInfo, initStoreSubjectInfo } =
  selectSubjectInModal.actions;
export default selectSubjectInModal.reducer;
