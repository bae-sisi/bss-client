'use client';

import { Modal } from 'flowbite-react';

interface ModifyPasswordModalProps {
  openModifyPasswordModal: string | undefined;
  setOpenModifyPasswordModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export default function ModifyPasswordModal({
  openModifyPasswordModal,
  setOpenModifyPasswordModal,
}: ModifyPasswordModalProps) {
  const handleModifyPassword = () => {
    const confirmResult = confirm('비밀번호를 변경하시겠습니까?');
    if (!confirmResult) return;
    alert('비밀번호가 변경되었습니다');
    setOpenModifyPasswordModal(undefined);
  };

  return (
    <Modal
      show={openModifyPasswordModal === 'default'}
      onClose={() => setOpenModifyPasswordModal(undefined)}
      className='fade-in-fast'
      size='md'
    >
      <Modal.Header>🔒 비밀번호 변경</Modal.Header>
      <Modal.Body className='p-3 pb-3'>
        <div className='space-y-2'>
          <div className='flex flex-col gap-3 mt-3 ml-2'>
            <div className='flex items-center'>
              <span className='w-[9rem]'>현재 비밀번호</span>
              <input
                type='password'
                className='h-8 border w-[14rem] px-2 tracking-widest rounded-[0.2rem] border-[#b4b4b4]'
              />
            </div>
            <div className='flex items-center'>
              <span className='w-[9rem]'>신규 비밀번호</span>
              <input
                type='password'
                className='h-8 border w-[14rem] px-2 tracking-widest rounded-[0.2rem] border-[#b4b4b4]'
              />
            </div>
            <div className='flex items-center'>
              <span className='w-[9rem]'>신규 비밀번호 재입력</span>
              <input
                type='password'
                className='h-8 border w-[14rem] px-2 tracking-widest rounded-[0.2rem] border-[#b4b4b4]'
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='mx-auto border-none'>
        <button
          onClick={handleModifyPassword}
          className='text-white bg-[#3870e0] px-4 py-[0.4rem] rounded-[0.2rem] font-light focus:bg-[#3464c2] hover:bg-[#3464c2] box-shadow'
        >
          완료
        </button>
        <button
          onClick={() => setOpenModifyPasswordModal(undefined)}
          className='bg-[#dddee0] px-4 py-[0.4rem] rounded-[0.2rem] font-light focus:bg-[#d0d1d3] hover:bg-[#d0d1d3] box-shadow'
        >
          취소
        </button>
      </Modal.Footer>
    </Modal>
  );
}
