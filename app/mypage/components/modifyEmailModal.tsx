'use client';

import { Modal } from 'flowbite-react';

interface ModifyEmailModalProps {
  openModifyEmailModal: string | undefined;
  setOpenModifyEmailModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export default function ModifyEmailModal({
  openModifyEmailModal,
  setOpenModifyEmailModal,
}: ModifyEmailModalProps) {
  const handleModifyUsername = () => {
    const confirmResult = confirm('이메일을 변경하시겠습니까?');
    if (!confirmResult) return;
    alert('이메일이 변경되었습니다');
    setOpenModifyEmailModal(undefined);
  };

  return (
    <Modal
      show={openModifyEmailModal === 'default'}
      onClose={() => setOpenModifyEmailModal(undefined)}
      className='fade-in-fast'
      size='sm'
    >
      <Modal.Header>✉️ 이메일 변경</Modal.Header>
      <Modal.Body className='p-3 pb-3'>
        <div className='space-y-2'>
          <div className='flex flex-col gap-2 mt-3 ml-2'>
            <span className='w-[5.5rem]'>변경할 이메일</span>
            <div className='flex items-center gap-2'>
              <input
                type='text'
                placeholder='abc@gmail.com'
                className='h-8 border w-[16rem] px-2 border-[#b4b4b4] text-sm rounded-[0.2rem] placeholder:text-gray-400'
              />
              <button className='text-white bg-[#3870e0] w-[5rem] h-8 rounded-[0.2rem] font-light focus:bg-[#3464c2] hover:bg-[#3464c2] box-shadow'>
                중복확인
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='mx-auto border-none'>
        <button
          onClick={handleModifyUsername}
          className='text-white bg-[#3870e0] px-4 py-[0.4rem] rounded-[0.2rem] font-light focus:bg-[#3464c2] hover:bg-[#3464c2] box-shadow'
        >
          완료
        </button>
        <button
          onClick={() => setOpenModifyEmailModal(undefined)}
          className='bg-[#dddee0] px-4 py-[0.4rem] rounded-[0.2rem] font-light focus:bg-[#d0d1d3] hover:bg-[#d0d1d3] box-shadow'
        >
          취소
        </button>
      </Modal.Footer>
    </Modal>
  );
}
