'use client';

import { Label, Modal } from 'flowbite-react';
import React, { useState } from 'react';
import ReviewStarsButtons from './ReviewStarsButtons';

interface RegisterLectureReviewModalProps {
  openRegisterLectureReviewModal: string | undefined;
  setOpenRegisterLectureReviewModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export default function RegisterLectureReviewModal({
  openRegisterLectureReviewModal,
  setOpenRegisterLectureReviewModal,
}: RegisterLectureReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [selectedAssignment, setSelectedAssignment] = useState('');
  const [selectedGroupWork, setSelectedGroupWork] = useState('');
  const [selectedGrading, setSelectedGrading] = useState('');
  const [selectedAttendance, setSelectedAttendance] = useState('');
  const [selectedExams, setSelectedExams] = useState('');

  const handleAssignmentClick = (value: string) => {
    setSelectedAssignment(value);
  };

  const handleGroupWorkClick = (value: string) => {
    setSelectedGroupWork(value);
  };

  const handleGradingClick = (value: string) => {
    setSelectedGrading(value);
  };

  const handleAttendanceClick = (value: string) => {
    setSelectedAttendance(value);
  };

  const handleExamsClick = (value: string) => {
    setSelectedExams(value);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleRegisterLectureReview = () => {
    alert('강의평이 등록되었습니다');
    setOpenRegisterLectureReviewModal(undefined);
  };

  return (
    <Modal
      show={openRegisterLectureReviewModal === 'default'}
      onClose={() => setOpenRegisterLectureReviewModal(undefined)}
      className='fade-in-fast'
      size='2xl'
    >
      <Modal.Header>✏️ 강의평 등록</Modal.Header>
      <Modal.Body className='p-3 pb-3'>
        <div className='space-y-2'>
          <div className='flex flex-col gap-3 mt-3 w-[36rem] mx-auto'>
            <div className='flex ml-5 gap-10'>
              <div className='scale-150 ml-4 mb-[0.175rem]'>
                <ReviewStarsButtons onRatingChange={handleRatingChange} />
              </div>
              <div className='flex gap-[0.175rem] text-base mt-[0.125rem]'>
                <span className='text-[#666]'>{rating}</span>
                <span className='text-[#666]'>/</span>
                <span className='text-[#666]'>5</span>
              </div>
            </div>
            <div className='w-full'>
              <textarea
                className='w-full rounded-md min-h-[8rem]'
                placeholder='이 강의에 대한 총평을 작성해 주세요'
              />
            </div>

            <hr className='mt-5 mb-3' />

            <div className='flex flex-col gap-7'>
              <div className='flex flex-col gap-1'>
                <div className='ml-1 block'>
                  <Label
                    htmlFor='subjectClass'
                    value='언제 수강했나요?'
                    className='text-base'
                  />
                </div>
                <select
                  name='subjectClass'
                  //   value={subjectClassState}
                  //   onChange={(e) => {
                  //     setSubjectClassState(e.target.value);
                  //   }}
                  className='border w-fit py-0 h-[1.5rem] rounded-sm border-[#c7cbd2] text-sm'
                >
                  <option value='all'>수강 학기 선택</option>
                  <option value='23년 2학기'>23년 2학기</option>
                  <option value='23년 여름'>23년 여름</option>
                  <option value='23년 1학기'>23년 1학기</option>
                  <option value='22년 겨울'>22년 겨울</option>
                  <option value='22년 2학기'>22년 2학기</option>
                  <option value='22년 여름'>22년 여름</option>
                  <option value='22년 1학기'>22년 1학기</option>
                  <option value='21년 겨울'>21년 겨울</option>
                  <option value='21년 2학기'>21년 2학기</option>
                </select>
              </div>

              <div className='flex flex-col gap-1'>
                <div className='ml-1 block'>
                  <Label
                    htmlFor='subjectClass'
                    value='과제가 많은가요?'
                    className='text-base'
                  />
                </div>
                <div className='flex gap-1'>
                  {['많음', '보통', '없음'].map((value) => (
                    <button
                      key={value}
                      className={`${
                        selectedAssignment === value
                          ? 'border-2 border-[#3870e0] text-[#3870e0] font-semibold shadow-md'
                          : 'border border-[#9ba3af]'
                      }  px-4 h-8 rounded-md w-[3.75rem]`}
                      onClick={() => handleAssignmentClick(value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <div className='ml-1 block'>
                  <Label
                    htmlFor='subjectClass'
                    value='조모임이 많은가요?'
                    className='text-base'
                  />
                </div>
                <div className='flex gap-1'>
                  {['많음', '보통', '없음'].map((value) => (
                    <button
                      key={value}
                      className={`${
                        selectedGroupWork === value
                          ? 'border-2 border-[#3870e0] text-[#3870e0] font-semibold shadow-md'
                          : 'border border-[#9ba3af]'
                      }  px-4 h-8 rounded-md w-[3.75rem]`}
                      onClick={() => handleGroupWorkClick(value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <div className='ml-1 block'>
                  <Label
                    htmlFor='subjectClass'
                    value='성적은 어떻게 주시나요?'
                    className='text-base'
                  />
                </div>
                <div className='flex gap-1'>
                  {['너그러움', '보통', '깐깐함'].map((value) => (
                    <button
                      key={value}
                      className={`${
                        selectedGrading === value
                          ? 'border-2 border-[#3870e0] text-[#3870e0] font-semibold shadow-md'
                          : 'border border-[#9ba3af]'
                      }  px-4 h-8 rounded-md w-[5.25rem]`}
                      onClick={() => handleGradingClick(value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <div className='ml-1 block'>
                  <Label
                    htmlFor='subjectClass'
                    value='출석은 어떻게 확인하나요?'
                    className='text-base'
                  />
                </div>
                <div className='flex gap-1'>
                  {[
                    '복합적',
                    '직접호명',
                    '지정좌석',
                    '전자출결',
                    '반영안함',
                  ].map((value) => (
                    <button
                      key={value}
                      className={`${
                        selectedAttendance === value
                          ? 'border-2 border-[#3870e0] text-[#3870e0] font-semibold shadow-md'
                          : 'border border-[#9ba3af]'
                      }  px-4 h-8 rounded-md w-[5.25rem]`}
                      onClick={() => handleAttendanceClick(value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <div className='ml-1 block'>
                  <Label
                    htmlFor='subjectClass'
                    value='시험은 몇 번 보나요?'
                    className='text-base'
                  />
                </div>
                <div className='flex gap-1'>
                  {['네 번 이상', '세 번', '두 번', '한 번', '없음'].map(
                    (value) => (
                      <button
                        key={value}
                        className={`${
                          selectedExams === value
                            ? 'border-2 border-[#3870e0] text-[#3870e0] font-semibold shadow-md'
                            : 'border border-[#9ba3af]'
                        }  px-4 h-8 rounded-md w-[5.75rem]`}
                        onClick={() => handleExamsClick(value)}
                      >
                        {value}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <div className='text-[#777] text-sm'>
                  ※ <span className='text-red-500'>수정 및 삭제가 불가능</span>
                  하므로 신중히 작성해 주세요
                </div>
                <div className='text-[#777] text-sm'>
                  ※ 허위, 중복, 저작권 침해, 성의 없는 내용을 작성할 경우,
                  서비스 이용이 제한될 수 있습니다
                </div>
              </div>

              <button
                onClick={handleRegisterLectureReview}
                className='text-white mb-3  bg-[#3870e0] px-4 py-[0.75em] rounded-lg font-semibold focus:bg-[#3464c2] hover:bg-[#3464c2] box-shadow'
              >
                평가하기
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
