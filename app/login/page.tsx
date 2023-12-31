'use client';

import React, { useEffect, useRef, useState } from 'react';
import { signIn } from '../redux/features/authSlice';
import { AppDispatch, useAppSelector } from '../redux/store';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';
import Link from 'next/link';

export default function Login() {
  const STR_RIGHT_CASE_INPUT_ELEMENT_STYLE_CLASSNAME =
    'block px-2.5 pb-3.5 pt-3.5 w-full text-sm text-gray-900 bg-transparent rounded-[0.2rem] border-1 border-[#d8d9dc] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-2 peer';
  const STR_WRONG_CASE_INPUT_ELEMENT_STYLE_CLASSNAME =
    'block px-2.5 pb-3.5 pt-3.5 w-full text-sm text-gray-900 bg-transparent rounded-[0.2rem] border-1 border-[#d8d9dc] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#c84031] focus:outline-none focus:ring-0 focus:border-[#c84031] focus:border-2 peer';
  const STR_RIGHT_CASE_LABEL_ELEMENT_STYLE_CLASSNAME =
    'absolute text-sm text-gray-500 dark:text-gray-400 duration-150 transform -translate-y-[1.07rem] scale-75 top-2 origin-[0] bg-white dark:bg-gray-900 px-1 peer-focus:px-1 peer-focus:text-blue-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2';
  const STR_WRONG_CASE_LABEL_ELEMENT_STYLE_CLASSNAME =
    'absolute text-sm text-gray-500 dark:text-gray-400 duration-150 transform -translate-y-[1.07rem] scale-75 top-2 origin-[0] bg-white dark:bg-gray-900 px-1 peer-focus:px-1 peer-focus:text-[#c84031] peer-focus:dark:text-[#c84031] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2';

  const [userAccountInfo, setUserAccountInfo] = useState({
    id: '',
    pwd: '',
  });
  const [idInputAnnounceMsg, setIdInputAnnouceMsg] = useState('');
  const [pwdInputAnnounceMsg, setPwdInputAnnouceMsg] = useState('');
  const [idInputElementStyle, setIdInputElementStyle] = useState(
    STR_RIGHT_CASE_INPUT_ELEMENT_STYLE_CLASSNAME
  );
  const [idLabelElementStyle, setIdLabelElementStyle] = useState(
    STR_RIGHT_CASE_LABEL_ELEMENT_STYLE_CLASSNAME
  );
  const [pwdInputElementStyle, setPwdInputElementStyle] = useState(
    STR_RIGHT_CASE_INPUT_ELEMENT_STYLE_CLASSNAME
  );
  const [pwdLabelElementStyle, setPwdLabelElementStyle] = useState(
    STR_RIGHT_CASE_LABEL_ELEMENT_STYLE_CLASSNAME
  );
  const [openPrivacyPolicyModal, setOpenPrivacyPolicyModal] = useState<
    string | undefined
  >();

  const idInputRef = useRef<HTMLInputElement>(null);
  const pwdInputRef = useRef<HTMLInputElement>(null);

  const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIdInputAnnouceMsg('');
    setPwdInputAnnouceMsg('');
    setIdInputElementStyle(STR_RIGHT_CASE_INPUT_ELEMENT_STYLE_CLASSNAME);
    setIdLabelElementStyle(STR_RIGHT_CASE_LABEL_ELEMENT_STYLE_CLASSNAME);
    setPwdLabelElementStyle(STR_RIGHT_CASE_INPUT_ELEMENT_STYLE_CLASSNAME);
    setPwdLabelElementStyle(STR_RIGHT_CASE_LABEL_ELEMENT_STYLE_CLASSNAME);

    if (!userAccountInfo.id) {
      idInputRef.current?.focus();
      setIdInputAnnouceMsg('학번 또는 교번을 입력하세요.');
      setIdInputElementStyle(STR_WRONG_CASE_INPUT_ELEMENT_STYLE_CLASSNAME);
      setIdLabelElementStyle(STR_WRONG_CASE_LABEL_ELEMENT_STYLE_CLASSNAME);
      return;
    }

    if (!userAccountInfo.pwd) {
      pwdInputRef.current?.focus();
      setPwdInputAnnouceMsg('비밀번호를 입력하세요.');
      setPwdInputElementStyle(STR_WRONG_CASE_INPUT_ELEMENT_STYLE_CLASSNAME);
      setPwdLabelElementStyle(STR_WRONG_CASE_LABEL_ELEMENT_STYLE_CLASSNAME);
      return;
    }

    try {
      const res = await fetch(`/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sid: userAccountInfo.id,
          password: userAccountInfo.pwd,
        }),
      });

      switch (res.status) {
        case 200:
          const res = await fetch(`/api/auth/currentuser`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data = await res.json();
          const userInfo = {
            username: data.username,
            email: data.email,
            sid: data.sid,
            role: data.role,
          };
          dispatch(signIn(userInfo));

          router.push('/');
          break;
        case 400:
          idInputRef.current?.focus();
          setIdInputAnnouceMsg(
            '아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해 주세요'
          );
          setIdInputElementStyle(STR_WRONG_CASE_INPUT_ELEMENT_STYLE_CLASSNAME);
          setIdLabelElementStyle(STR_WRONG_CASE_LABEL_ELEMENT_STYLE_CLASSNAME);
          return;
          break;
        default:
          alert('정의되지 않은 http status code입니다');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      throw err;
    }
  };

  useEffect(() => {
    if (isAuth) {
      router.push('/');
      return;
    }
  }, [isAuth, router]);

  return (
    <div className='mt-10 h-[39rem]'>
      <div className='w-fit 2md:w-96 p-4 mx-auto'>
        <div className='flex flex-col text-center border p-8 rounded-md border-[#d8d9dc] bg-[#fefefe] shadow-lg'>
          <div className='flex flex-col gap-2 text-xl my-2'>
            <img
              src='/images/logo.png'
              alt='logo'
              style={{ width: '2rem' }}
              className='mx-auto mb-1'
            />
            <p>로그인</p>
          </div>

          <form>
            <div className='flex flex-col w-full mx-auto mt-6'>
              <div className='relative h-12'>
                <input
                  type='text'
                  id='floating_outlined'
                  className={idInputElementStyle}
                  value={userAccountInfo.id}
                  ref={idInputRef}
                  onChange={(e) =>
                    setUserAccountInfo({
                      ...userAccountInfo,
                      id: e.target.value,
                    })
                  }
                  placeholder=' '
                />
                <label
                  htmlFor='floating_outlined'
                  className={idLabelElementStyle}
                >
                  학번
                </label>
              </div>
              {idInputAnnounceMsg && (
                <div className='flex mt-[0.3rem]'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='15'
                    viewBox='0 -960 960 960'
                    width='15'
                    fill='#c84031'
                    className='relative left-[0.1rem] top-[0.1rem]'
                  >
                    <path d='M479.928-274.022q16.463 0 27.398-10.743 10.935-10.743 10.935-27.206 0-16.464-10.863-27.518-10.862-11.055-27.326-11.055-16.463 0-27.398 11.037-10.935 11.037-10.935 27.501 0 16.463 10.863 27.224 10.862 10.76 27.326 10.76Zm-30.993-158.739h68.13v-257.065h-68.13v257.065Zm31.364 358.74q-84.202 0-158.041-31.879t-129.159-87.199q-55.32-55.32-87.199-129.201-31.878-73.88-31.878-158.167t31.878-158.2q31.879-73.914 87.161-128.747 55.283-54.832 129.181-86.818 73.899-31.986 158.205-31.986 84.307 0 158.249 31.968 73.942 31.967 128.756 86.768 54.815 54.801 86.79 128.883 31.976 74.083 31.976 158.333 0 84.235-31.986 158.07t-86.818 128.942q-54.833 55.107-128.873 87.169-74.04 32.063-158.242 32.063Z' />
                  </svg>
                  <p
                    id='helper-checkbox-text'
                    className='relative pr-2 left-[0.5rem] w-full text-left text-xs font-normal text-[#c84031] dark:text-gray-300'
                  >
                    {idInputAnnounceMsg}
                  </p>
                </div>
              )}

              <div className='relative h-12 mt-5'>
                <input
                  type='password'
                  id='floating_outlined'
                  className={pwdInputElementStyle}
                  value={userAccountInfo.pwd}
                  ref={pwdInputRef}
                  onChange={(e) => {
                    setUserAccountInfo({
                      ...userAccountInfo,
                      pwd: e.target.value,
                    });
                  }}
                  placeholder=' '
                />
                <label
                  htmlFor='floating_outlined'
                  className={pwdLabelElementStyle}
                >
                  비밀번호 입력
                </label>
              </div>
              {pwdInputAnnounceMsg && (
                <div className='flex mt-[0.3rem] mb-1'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    height='15'
                    viewBox='0 -960 960 960'
                    width='15'
                    fill='#c84031'
                    className='relative left-[0.1rem] top-[0.1rem]'
                  >
                    <path d='M479.928-274.022q16.463 0 27.398-10.743 10.935-10.743 10.935-27.206 0-16.464-10.863-27.518-10.862-11.055-27.326-11.055-16.463 0-27.398 11.037-10.935 11.037-10.935 27.501 0 16.463 10.863 27.224 10.862 10.76 27.326 10.76Zm-30.993-158.739h68.13v-257.065h-68.13v257.065Zm31.364 358.74q-84.202 0-158.041-31.879t-129.159-87.199q-55.32-55.32-87.199-129.201-31.878-73.88-31.878-158.167t31.878-158.2q31.879-73.914 87.161-128.747 55.283-54.832 129.181-86.818 73.899-31.986 158.205-31.986 84.307 0 158.249 31.968 73.942 31.967 128.756 86.768 54.815 54.801 86.79 128.883 31.976 74.083 31.976 158.333 0 84.235-31.986 158.07t-86.818 128.942q-54.833 55.107-128.873 87.169-74.04 32.063-158.242 32.063Z' />
                  </svg>
                  <p
                    id='helper-checkbox-text'
                    className='relative pr-2 left-[0.5rem] w-full text-left text-xs font-normal text-[#c84031] dark:text-gray-300'
                  >
                    {pwdInputAnnounceMsg}
                  </p>
                </div>
              )}
            </div>
            <div className='h-36 flex flex-col mt-[0.625rem] justify-between text-left mb-6'>
              <Link
                href='/resetPassword'
                className='text-[#437ae1] text-[0.8rem] font-semibold w-fit'
              >
                비밀번호를 잊으셨나요?
              </Link>
              <div className='text-[0.8rem] text-gray-600'>
                내 컴퓨터가 아닌가요? 게스트 모드를 사용하여 비공개로
                로그인하세요.
              </div>
              <div className='flex justify-between items-center'>
                <Link
                  href='/register'
                  className='text-[#437ae1] translate-x-[-0.5rem] text-[0.8rem] font-normal px-2 py-1 hover:bg-[#f3f4f5] rounded-[0rem] focus:bg-[#f3f4f5]'
                >
                  계정 만들기
                </Link>
                <button
                  type='submit'
                  onClick={handleSignIn}
                  className=' text-white bg-[#3870e0] px-4 py-[0.4rem] rounded-[0.2rem] font-light focus:bg-[#3464c2] hover:bg-[#3464c2] box-shadow'
                >
                  로그인
                </button>
              </div>
            </div>
          </form>
          <div>
            <div date-rangepicker='true' className='flex items-center'>
              <div className='relative'></div>
            </div>
          </div>
        </div>
        <div className='flex mt-5 text-[0.6rem] text-gray-700 justify-end'>
          <button onClick={() => setOpenPrivacyPolicyModal('default')}>
            개인정보처리방침
          </button>
          {openPrivacyPolicyModal ? (
            <PrivacyPolicyModal
              openPrivacyPolicyModal={openPrivacyPolicyModal}
              setOpenPrivacyPolicyModal={setOpenPrivacyPolicyModal}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
