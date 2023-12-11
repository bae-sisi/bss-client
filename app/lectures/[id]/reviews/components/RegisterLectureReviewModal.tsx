'use client';

import { Label, Modal } from 'flowbite-react';
import React, { useState } from 'react';
import ReviewStarsButtons from './ReviewStarsButtons';

interface RegisterLectureReviewModalProps {
  pid: string;
  openRegisterLectureReviewModal: string | undefined;
  setOpenRegisterLectureReviewModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  onReviewSubmitted: () => void;
}

export default function RegisterLectureReviewModal({
  pid,
  openRegisterLectureReviewModal,
  setOpenRegisterLectureReviewModal,
  onReviewSubmitted,
}: RegisterLectureReviewModalProps) {
  const [reviewInfo, setReviewInfo] = useState({
    rating: 0,
    content: '',
    enrollSems: '',
    progressId: pid,
    assignmentFreq: 0,
    groupFreq: 0,
    grading: 0,
    attending: 0,
    examNum: 0,
  });

  const assignmentFreqOption = ['많음', '보통', '없음'];
  const groupFreqOption = ['많음', '보통', '없음'];
  const gradingOption = ['너그러움', '보통', '깐깐함'];
  const attendingOption = [
    '복합적',
    '직접호명',
    '지정좌석',
    '전자출결',
    '반영안함',
  ];
  const examNumOption = ['네 번 이상', '세 번', '두 번', '한 번', '없음'];

  const handleRatingChange = (newRating: number) => {
    setReviewInfo({ ...reviewInfo, rating: newRating });
  };

  const handleRegisterLectureReview = async () => {
    try {
      const res = await fetch(
        `/api/auth/save/cmt?content=${reviewInfo.content}&enrollSems=${reviewInfo.enrollSems}&progress_id=${reviewInfo.progressId}&assignment_freq=${reviewInfo.assignmentFreq}&group_freq=${reviewInfo.groupFreq}&grading=${reviewInfo.grading}&attending=${reviewInfo.attending}&exam_num=${reviewInfo.examNum}&rate=${reviewInfo.rating}`,
        {
          method: 'POST',
        }
      );

      switch (res.status) {
        case 201:
          alert('강의평이 등록되었습니다');
          setOpenRegisterLectureReviewModal(undefined);
          onReviewSubmitted();
          break;
        case 400:
          location.href = '/login';
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      throw err;
    }
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
                <span className='text-[#666]'>{reviewInfo.rating}</span>
                <span className='text-[#666]'>/</span>
                <span className='text-[#666]'>5</span>
              </div>
            </div>
            <div className='w-full'>
              <textarea
                className='w-full rounded-md min-h-[8rem]'
                placeholder='이 강의에 대한 총평을 작성해 주세요'
                onChange={(e) =>
                  setReviewInfo({ ...reviewInfo, content: e.target.value })
                }
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
                  name='enrollSemester'
                  value={reviewInfo.enrollSems}
                  onChange={(e) => {
                    setReviewInfo({
                      ...reviewInfo,
                      enrollSems: e.target.value,
                    });
                  }}
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
                  {assignmentFreqOption.map((value, index) => (
                    <button
                      key={value}
                      className={`${
                        assignmentFreqOption.length -
                          reviewInfo.assignmentFreq ===
                        index
                          ? 'border-2 border-[#3870e0] text-[#3870e0] font-semibold shadow-md'
                          : 'border border-[#9ba3af]'
                      }  px-4 h-8 rounded-md w-[4rem]`}
                      onClick={() =>
                        setReviewInfo({
                          ...reviewInfo,
                          assignmentFreq: assignmentFreqOption.length - index,
                        })
                      }
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
                  {['많음', '보통', '없음'].map((value, index) => (
                    <button
                      key={value}
                      className={`${
                        groupFreqOption.length - reviewInfo.groupFreq === index
                          ? 'border-2 border-[#3870e0] text-[#3870e0] font-semibold shadow-md'
                          : 'border border-[#9ba3af]'
                      }  px-4 h-8 rounded-md w-[4rem]`}
                      onClick={() =>
                        setReviewInfo({
                          ...reviewInfo,
                          groupFreq: groupFreqOption.length - index,
                        })
                      }
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
                  {gradingOption.map((value, index) => (
                    <button
                      key={value}
                      className={`${
                        gradingOption.length - reviewInfo.grading === index
                          ? 'border-2 border-[#3870e0] text-[#3870e0] font-semibold shadow-md'
                          : 'border border-[#9ba3af]'
                      }  px-4 h-8 rounded-md w-[5.5rem]`}
                      onClick={() =>
                        setReviewInfo({
                          ...reviewInfo,
                          grading: gradingOption.length - index,
                        })
                      }
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
                  {attendingOption.map((value, index) => (
                    <button
                      key={value}
                      className={`${
                        attendingOption.length - reviewInfo.attending === index
                          ? 'border-2 border-[#3870e0] text-[#3870e0] font-semibold shadow-md'
                          : 'border border-[#9ba3af]'
                      }  px-4 h-8 rounded-md w-[5.5rem]`}
                      onClick={() =>
                        setReviewInfo({
                          ...reviewInfo,
                          attending: attendingOption.length - index,
                        })
                      }
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
                  {examNumOption.map((value, index) => (
                    <button
                      key={value}
                      className={`${
                        examNumOption.length - reviewInfo.examNum === index
                          ? 'border-2 border-[#3870e0] text-[#3870e0] font-semibold shadow-md'
                          : 'border border-[#9ba3af]'
                      }  px-4 h-8 rounded-md w-[6rem]`}
                      onClick={() =>
                        setReviewInfo({
                          ...reviewInfo,
                          examNum: examNumOption.length - index,
                        })
                      }
                    >
                      {value}
                    </button>
                  ))}
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
