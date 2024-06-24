import { render, screen } from '@testing-library/react'; // 테스트 라이브러리에서 필요한 모듈을 import 합니다.
import App from './App'; // App 컴포넌트를 import 합니다.

test('renders learn react link', () => { // 'learn react' 링크가 렌더링 되는지 테스트합니다.
  render(<App />); // App 컴포넌트를 렌더링 합니다.
  const linkElement = screen.getByText(/learn react/i); // 'learn react' 텍스트를 가진 엘리먼트를 찾습니다.
  expect(linkElement).toBeInTheDocument(); // 해당 엘리먼트가 문서에 존재하는지 확인합니다.
});
