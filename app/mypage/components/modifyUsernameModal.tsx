'use client';

import { setGlobalUsername } from '@/app/redux/features/authSlice';
import { AppDispatch, useAppSelector } from '@/app/redux/store';
import { Modal } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

interface ModifyUsernameModalProps {
  openModifyUsernameModal: string | undefined;
  setOpenModifyUsernameModal: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export default function ModifyUsernameModal({
  openModifyUsernameModal,
  setOpenModifyUsernameModal,
}: ModifyUsernameModalProps) {
  const [usernameState, setUsernameState] = useState('');

  const sid = useAppSelector((state) => state.authReducer.value.sid);
  const username = useAppSelector((state) => state.authReducer.value.username);
  const email = useAppSelector((state) => state.authReducer.value.email);

  const dispatch = useDispatch<AppDispatch>();

  const handleModifyUsername = async () => {
    const confirmResult = confirm('이름을 변경하시겠습니까?');
    if (!confirmResult) return;

    try {
      const res = await fetch(`/api/auth/user/change/info/${sid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
        }),
      });

      const data = await res.json();

      switch (res.status) {
        case 202:
          alert('이름이 변경되었습니다');
          setUsernameState(username);
          dispatch(setGlobalUsername(usernameState));
          setOpenModifyUsernameModal(undefined);
          break;
        case 400:
          // location.href = '/login';
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
                value={usernameState}
                onChange={(e) => setUsernameState(e.target.value)}
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
