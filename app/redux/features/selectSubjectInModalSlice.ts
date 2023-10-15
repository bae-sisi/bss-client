import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubjectInfo {
  department: string;
  grade: string;
  subjectClass: string;
  section: string;
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
    department: '',
    grade: '',
    subjectClass: '',
    section: '',
    subjectName: '',
    profName: '',
    isSelected: false,
  } as SubjectState,
} as initialState;

export const selectSubjectInModal = createSlice({
  name: 'selectSubjectInModal',
  initialState,
  reducers: {
    storeSubjectInfo: (state, action: PayloadAction<SubjectInfo>) => {
      return {
        value: {
          department: action.payload.department,
          grade: action.payload.grade,
          subjectClass: action.payload.subjectClass,
          section: action.payload.section,
          subjectName: action.payload.subjectName,
          profName: action.payload.profName,
          isSelected: true,
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
