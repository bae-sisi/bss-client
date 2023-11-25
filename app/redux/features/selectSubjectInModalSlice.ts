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
  isSubjectSelected: boolean;
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
          department: action.payload.department,
          grade: action.payload.grade,
          subjectClass: action.payload.subjectClass,
          section: action.payload.section,
          subjectName: action.payload.subjectName,
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
