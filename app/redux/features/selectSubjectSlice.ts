import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubjectInfo {
  subjectName: string;
  profName: string;
}

type SubjectState = SubjectInfo & {
  isSelected: boolean;
};

type initialState = {
  value: SubjectState;
};

const initialState = {
  value: {
    subjectName: '',
    profName: '',
    isSelected: false,
  } as SubjectState,
} as initialState;

export const selectSubject = createSlice({
  name: 'selectSubject',
  initialState,
  reducers: {
    storeSubjectInfo: (state, action: PayloadAction<SubjectInfo>) => {
      return {
        value: {
          subjectName: action.payload.subjectName,
          profName: action.payload.profName,
          isSelected: true,
        },
      };
    },

    initSubjectInfo: () => {
      return initialState;
    },
  },
});

export const { storeSubjectInfo, initSubjectInfo } = selectSubject.actions;
export default selectSubject.reducer;
