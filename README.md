# Better インターネット時報

![workflow](https://github.com/true-nosuke/ts/actions/workflows/vite.yml/badge.svg)

## 概要

インターネット時報は、[NICT（情報通信研究機構）](https://www.nict.go.jp/JST/JST5.html)のNTPサーバーから取得した正確な日本標準時(JST)を、音声とミリ秒単位の表示で提供するWebアプリケーションです。

ページを開いた時にデバイスとJSTの誤差を取得し、デバイス時刻から誤差を差し引いて表示しています。  
（NICTのNTP → サーバ修正 → ローカル修正）

一部コードはAI生成によって書かれています。

### クレジット

©Google / ©アクエスト / ©VOICEVOX:ずんだもん

## ライセンス

© 2023 AZO — Licensed under the MIT License.  
Modified and published by Nosuke.

### オリジナル版

このプロジェクトは[AZO234/timesignal](https://github.com/AZO234/timesignal)をベースに改良・拡張したものです。

## 貢献

バグ報告や機能提案は[Issues](https://github.com/true-nosuke/ts/issues)まで
## 主な機能

### 🕐 正確な時刻表示
- **ミリ秒単位**での時刻表示
- NICTのNTPサーバーと同期して誤差を自動補正
- 24時間制/12時間制の切り替え

### 🔊 音声時報
- **毎正時**に音声で時刻をアナウンス
- **3種類の音声**から選択可能：
  - Google音声（機械音声）
  - ゆっくり音声（合成音声）
  - ずんだもん音声（VOICEVOX）
- ティック音とチャイム音による秒カウント

### ⚙️ カスタマイズ機能
- 音量調整（0〜100%）
- 無音モード
- 一時停止機能（目押し練習用）
- URLパラメータで初期設定をカスタマイズ可能


### 🎨 テーマ切り替え
- **ライトモード**: 明るい画面（デフォルト）
- **ダークモード**: 暗い画面
- **レッドダークモード**: 星観測用の赤色モード

## URL

[https://true-nosuke.github.io/ts/](https://true-nosuke.github.io/ts/)

## 使い方

### 基本操作

1. ページを開くと自動的に時報が開始されます
2. **ブラウザのオートミュートが有効な場合**は、画面を一度クリックしてください
3. 画面上のチェックボックスやラジオボタンで設定を変更できます

### URLパラメータ

初期状態をURLパラメータで指定できます。

```
https://true-nosuke.github.io/ts/?h=24&v=1&vol=50&theme=dark
```

#### パラメータ一覧

| パラメータ | 値 | 説明 |
|-----------|---|------|
| `h` | `24` | 24時間制で表示（指定なしで12時間制） |
| `v` | `0`/`1`/`2` | 音声選択（0=Google、1=ゆっくり、2=ずんだもん） |
| `m` | `1` | 無音モード（指定なしで音あり） |
| `vol` | `0`〜`100` | 音量（0〜100、指定なしで100） |
| `theme` | `light`/`dark`/`red` | テーマ（light=ライト、dark=ダーク、red=レッドダーク） |

#### 使用例

```
# 24時間制 + ゆっくり音声 + 音量50% + ダークモード
?h=24&v=1&vol=50&theme=dark

# 無音モード + レッドダークモード
?m=1&theme=red

# ずんだもん音声 + 音量30%
?v=2&vol=30
```

## 技術仕様

### 開発環境

- **言語**: TypeScript
- **ビルドツール**: Vite
- **音声形式**: Opus (.opus)
- **対応ブラウザ**: モダンブラウザ（Chrome, Firefox, Safari, Edge）

### プロジェクト構成

```
timesignal-main/
├── index.html              # メインHTML
├── package.json            # 依存関係
├── vite.config.ts          # Vite設定
├── public/                 # 静的ファイル
│   ├── icons/             # アイコン
│   ├── sound/             # 基本音声（チック、チャイム）
│   ├── sound_google/      # Google音声ファイル
│   ├── sound_yukkuri/     # ゆっくり音声ファイル
│   └── sound_zunda/       # ずんだもん音声ファイル
└── src/
    ├── timesignal_ui.ts   # UI制御
    ├── getjst/            # JST取得モジュール
    └── timesignal/        # 時報コアロジック
```

## 音声について

### 使用音声

- **Google音声**: Google Text-to-Speech API
- **ゆっくり音声**: AquesTalk（合成音声）
- **ずんだもん音声**: VOICEVOX:ずんだもん


## 関連リンク

- [NICT 日本標準時グループ](https://www.nict.go.jp/JST/JST5.html)
- [オリジナル版（AZO234）](https://azo234.github.io/timesignal/)
