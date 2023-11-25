'use client';

import { Modal } from 'flowbite-react';

interface ModifyUsernameModalProps {
  openModifyUsernameModal: string | undefined;
  setOpenModifyUsernameModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  username: string;
}

export default function ModifyUsernameModal({
  openModifyUsernameModal,
  setOpenModifyUsernameModal,
  username,
}: ModifyUsernameModalProps) {
  const handleModifyUsername = () => {
    const confirmResult = confirm('이름을 변경하시겠습니까?');
    if (!confirmResult) return;
    alert('이름이 변경되었습니다');
    setOpenModifyUsernameModal(undefined);
  };

  return (
    <Modal
      show={openModifyUsernameModal === 'default'}
      onClose={() => setOpenModifyUsernameModal(undefined)}
      className='fade-in-fast'
      size='md'
    >
      <Modal.Header>이름 수정</Modal.Header>
      <Modal.Body className='p-3 pb-3'>
        <div className='space-y-2'>
          <div className='flex flex-col gap-3 mt-3 ml-2'>
            <div className='flex items-center'>
              <span className='w-[9rem]'>현재 이름</span>
              <input
                type='text'
                placeholder={username}
                className='h-8 border w-[14rem] px-2 border-[#b4b4b4] rounded-[0.2rem] bg-gray-100 text-sm'
                disabled
              />
            </div>
            <div className='flex items-center'>
              <span className='w-[9rem]'>변경할 이름</span>
              <input
                type='text'
                className='h-8 border w-[14rem] px-2 border-[#b4b4b4] rounded-[0.2rem] text-sm'
              />
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
          onClick={() => setOpenModifyUsernameModal(undefined)}
          className='bg-[#dddee0] px-4 py-[0.4rem] rounded-[0.2rem] font-light focus:bg-[#d0d1d3] hover:bg-[#d0d1d3] box-shadow'
        >
          취소
        </button>
      </Modal.Footer>
    </Modal>
  );
}
