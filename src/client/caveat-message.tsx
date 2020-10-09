import * as React from "react";
import { FC } from "react";

export const CaveatMessage: FC = ({}) => {
  const lines = [
    "観光の様子を実況配信することは禁止とさせていただきます。",
    "観光の様子を動画等に撮影・録音することは禁止とさせていただきます。",
    "SNS 等で、あたかも本物のにじさんじサーバー・ホロライブサーバーにログインしたとの誤解を与えるような情報発信はしないで下さい。",
    "その他、本プロジェクトのメンバーや、にじさんじ関係者、ホロライブ関係者、他の方の迷惑になる行為はしないで下さい。",
  ];
  return (
    <>
      <h2>禁止事項</h2>
      <div className="text">
        <ul>
          {lines.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
