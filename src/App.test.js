import React from 'react';
import { render, screen, act } from '@testing-library/react'; // act를 명시적으로 가져오기
import { MemoryRouter } from 'react-router-dom';
import App from './App';


test('renders HomePage component for the default route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  // HeaderComponent가 렌더링되었는지 확인
  expect(screen.getByText(/서비스 소개/i)).toBeInTheDocument();

  // 주요 요소들이 렌더링되었는지 확인
  expect(screen.getByAltText(/메인 배너 이미지/i)).toBeInTheDocument();
  expect(screen.getByText(/채팅하기/i)).toBeInTheDocument();

  // 텍스트가 여러 요소로 나뉘어 있는 경우 개별적으로 확인
  expect(screen.getByText(/아직 계정이 없다면/i)).toBeInTheDocument();
  expect(screen.getByText(/회원가입/i)).toBeInTheDocument();
  expect(screen.getByText(/하러가기/i)).toBeInTheDocument();

  // "얼굴형 분석" 텍스트가 여러 요소에 존재하는지 확인
  const faceAnalyzeElements = screen.getAllByText(/얼굴형 분석/i);
  expect(faceAnalyzeElements.length).toBeGreaterThan(0);

  // "맞춤 헤어스타일 추천" 텍스트가 여러 요소에 존재하는지 확인
  const styleRecommendElements = screen.getAllByText(/맞춤 헤어스타일 추천/i);
  expect(styleRecommendElements.length).toBeGreaterThan(0);

  // 서비스 소개 섹션이 렌더링되었는지 확인
  expect(screen.getByAltText(/얼굴형 분석 사진/i)).toBeInTheDocument();
  expect(screen.getByAltText(/맞춤 헤어스타일 추천 사진/i)).toBeInTheDocument();
});


test('renders FormPage component for the /form route', () => {
  act(() => { // act로 감싸기
    render(
      <MemoryRouter initialEntries={['/form']}>
        <App />
      </MemoryRouter>
    );
  });
  expect(screen.getByText(/submit your data/i)).toBeInTheDocument();

  const submitButtons = screen.getAllByText(/submit/i);
  expect(submitButtons.length).toBeGreaterThan(0);
});
