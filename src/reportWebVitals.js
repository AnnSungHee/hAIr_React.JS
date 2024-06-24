// 웹 성능 측정 파일
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) { // onPerfEntry가 함수인지 확인
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => { // web-vitals 모듈 동적 import
      getCLS(onPerfEntry); // CLS (Cumulative Layout Shift) 메트릭 호출
      getFID(onPerfEntry); // FID (First Input Delay) 메트릭 호출
      getFCP(onPerfEntry); // FCP (First Contentful Paint) 메트릭 호출
      getLCP(onPerfEntry); // LCP (Largest Contentful Paint) 메트릭 호출
      getTTFB(onPerfEntry); // TTFB (Time to First Byte) 메트릭 호출
    });
  }
};

export default reportWebVitals; // reportWebVitals 함수 export
