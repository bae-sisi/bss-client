'use client';

import { useAppSelector } from '@/app/redux/store';
import { Modal } from 'flowbite-react';
import { useState } from 'react';

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
  const [passwordInfo, setPasswordInfo] = useState({
    password: '',
    newPassword: '',
    newPasswordConfirm: '',
  });
  const [isPasswordValidFail, setIsPasswordValidFail] = useState(false);
  const [isNewPasswordConfirmValidFail, setIsNewPasswordConfirmValidFail] =
    useState(false);

  const sid = useAppSelector((state) => state.authReducer.value.sid);

  const handleModifyPassword = async () => {
    const confirmResult = confirm('비밀번호를 변경하시겠습니까?');
    if (!confirmResult) return;
    if (passwordInfo.newPassword !== passwordInfo.newPasswordConfirm) {
      alert('신규 비밀번호와 재입력 비밀번호가 같지 않습니다');
      setIsNewPasswordConfirmValidFail(true);
      return;
    }

    try {
      const res = await fetch(`/api/auth/user/change/password/${sid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: passwordInfo.password,
          newPassword: passwordInfo.newPassword,
        }),
      });

      const data = await res.json();

      switch (res.status) {
        case 202:
          alert('비밀번호가 정상적으로 변경되었습니다');
          setOpenModifyPasswordModal(undefined);
          break;
        case 400:
          alert('현재 비밀번호가 일치하지 않습니다');
          setIsPasswordValidFail(true);
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
                className={`h-8 border w-[14rem] px-2 tracking-widest rounded-[0.2rem] border-${
                  isPasswordValidFail ? 'red-500' : '[#b4b4b4]'
                }`}
                value={passwordInfo.password}
                onChange={(e) =>
                  setPasswordInfo({ ...passwordInfo, password: e.target.value })
                }
              />
            </div>
            <div className='flex items-center'>
              <span className='w-[9rem]'>신규 비밀번호</span>
              <input
                type='password'
                className='h-8 border w-[14rem] px-2 tracking-widest rounded-[0.2rem] border-[#b4b4b4]'
                value={passwordInfo.newPassword}
                onChange={(e) =>
                  setPasswordInfo({
                    ...passwordInfo,
                    newPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className='flex items-center'>
              <span className='w-[9rem]'>신규 비밀번호 재입력</span>
              <input
                type='password'
                className={`h-8 border w-[14rem] px-2 tracking-widest rounded-[0.2rem] border-${
                  isNewPasswordConfirmValidFail ? 'red-500' : '[#b4b4b4]'
                }`}
                value={passwordInfo.newPasswordConfirm}
                onChange={(e) =>
                  setPasswordInfo({
                    ...passwordInfo,
                    newPasswordConfirm: e.target.value,
                  })
                }
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
