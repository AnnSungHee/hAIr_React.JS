import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../assets/styles/components/HeaderComponentStyle.css';
import axios from 'axios';

const HeaderComponent = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');

    const handleLogout = async () => {
        await axios.post('http://localhost:8080/member/logout', {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('nickName');

        alert('로그아웃이 성공적으로 완료되었습니다.');
        navigate('/');  // 로그아웃 후 홈 페이지로 리디렉션 
    };

    const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

    return (
        <nav id='header'>
            <div className='headerContent'>
                <Link to="/">
                    <img className='logo' src="/logo.png" alt="회사 로고" />
                </Link>
                <div className={`menuToggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <ul className={`linkList ${menuOpen ? 'open' : ''}`}>
                    <li>
                        <Link 
                            to="/chatpage" 
                            className={isActive('/chatpage') ? 'selectedLink' : ''}
                        >
                            ChatBot
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/ai-hairstyle" 
                            className={isActive('/ai-hairstyle') ? 'selectedLink' : ''}
                        >
                            AI Simulation
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/mypage" 
                            className={isActive('/mypage') ? 'selectedLink' : ''}
                        >
                            Mypage
                        </Link>
                    </li>
                    {token ? (
                        <li>
                            <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                Log out
                            </div>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link 
                                    to="/sign-in" 
                                    className={isActive('/sign-in') || isActive('/join') ? 'selectedLink' : ''}
                                >
                                    Log in
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default HeaderComponent;



// import React from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import '../assets/styles/components/HeaderComponentStyle.css';
// import axios from 'axios';

// const HeaderComponent = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const token = localStorage.getItem('token');

//     const handleLogout = async () => {
//         await axios.post('http://localhost:8080/member/logout', {}, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             }
//         });

//         localStorage.removeItem('token');
//         localStorage.removeItem('id');
//         localStorage.removeItem('nickName');

//         alert('로그아웃이 성공적으로 완료되었습니다.');
//         navigate('/');  // 로그아웃 후 홈 페이지로 리디렉션 
//     };

//     // Debugging: 현재 경로를 출력해봅시다.
//     console.log('Current location:', location.pathname);

//     const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

//     return (
//         <nav id='header'>
//             <h1>헤더</h1>
//             <span className='headerContent'>
//                 <div>
//                     <Link to="/">
//                         <img className='logo' src="/logo.png" alt="회사 로고" />
//                     </Link>
//                 </div>
//                 <ul className='linkList'>
//                     <li>
//                         <Link 
//                             to="/chatpage" 
//                             className={isActive('/chatpage') ? 'selectedLink' : ''}
//                         >
//                             ChatBot
//                         </Link>
//                     </li>
//                     <li>
//                         <Link 
//                             to="/ai-hairstyle" 
//                             className={isActive('/ai-hairstyle') ? 'selectedLink' : ''}
//                         >
//                             AI Simulation
//                         </Link>
//                     </li>
//                     <li>
//                         <Link 
//                             to="/mypage" 
//                             className={isActive('/mypage') ? 'selectedLink' : ''}
//                         >
//                             Mypage
//                         </Link>
//                     </li>
//                     {token ? (
//                         <li>
//                             <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
//                                 Log out
//                             </div>
//                         </li>
//                     ) : (
//                         <>
//                             <li>
//                                 <Link 
//                                     to="/sign-in" 
//                                     className={isActive('/sign-in') || isActive('/join') ? 'selectedLink' : ''}
//                                 >
//                                     Log in
//                                 </Link>
//                             </li>
//                         </>
//                     )}
//                 </ul>
//             </span>
//         </nav>
//     );
// };

// export default HeaderComponent;
