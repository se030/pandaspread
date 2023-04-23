# pandaspread

사용자가 업로드한 데이터셋을 시각화하고 인터랙션을 통한 탐색을 지원하는 웹 어플리케이션입니다. 2023-1학기 성균관대학교 소프트웨어대학 졸업작품입니다.

<img src="https://user-images.githubusercontent.com/63814960/233793170-bae856a7-03af-4bae-a202-332c4af8063f.jpg" width="1000" />

## 주요 기능

<table>
  <tr>
    <th>파일 업로드 및 시각화</th>
    <th>요인 탐색</th>
  </tr>
  <tr>
    <td>
      <img
        src="https://user-images.githubusercontent.com/63814960/233833570-536b930e-b723-4034-8714-2e6fb2cceb64.gif"
        width="500"
      />
    </td>
    <td>
      <img
        src="https://user-images.githubusercontent.com/63814960/233836436-2e126218-e413-4dcc-85a6-0525894bda13.gif"
        width="500"
      />
    </td>
  </tr>
    <tr>
    <th>요인 순서 변경</th>
    <th>결측치 제거 및 정렬</th>
  </tr>
  <tr>
    <td>
      <img
        src="https://user-images.githubusercontent.com/63814960/233836434-6151324e-d02d-4f4b-9da2-b8fa25a8e8e8.gif"
        width="500"
      />
    </td>
    <td>
      <img
        src="https://user-images.githubusercontent.com/63814960/233836428-db5ca6cd-ec78-44d7-a94b-bed4b5e9d949.gif"
        width="500"
      />
    </td>
  </tr>
</table>

## 프로젝트 구조

```bash
.
├── client
│   ├── public
│   └── src
│       ├── @types
│       ├── apis
│       ├── components
│       ├── config
│       ├── constants
│       ├── contexts
│       ├── hooks
│       ├── pages
│       ├── routes
│       ├── store
│       └── styles
└── server
    ├── dataframe.py
    └── index.py
```
