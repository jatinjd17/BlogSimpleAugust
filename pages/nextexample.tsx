import React, { useEffect, useState } from "react";
import * as fs from "fs";

function NextExam() {
  const [all, setAll]: any = useState([]);
  const [allchaID, setAllchaID]: any = useState([]);
  // const [pageToken, setPageToken]: any = useState([]);

  let channels: any = [];
  let pageToken = "";

  useEffect(() => {}, []);

  const newyou = async () => {
    var i;
    let tk = "";

    for (i = 0; i < 40; i++) {
      //AIzaSyAJ_qNQud0GyV-KgzEUR_H7rAL5BE0x59U
      console.log(tk);

      let response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId=UCQgsAV6lsDhwcHmg75OtaIQ&maxResults=25&pageToken=${tk}&key=AIzaSyAJ_qNQud0GyV-KgzEUR_H7rAL5BE0x59U`
      );
      let data = await response.json();

      tk = data.nextPageToken ? data.nextPageToken : null;

      // console.log(tk);

      let yo = data.items;

      yo?.map((c, i) => {
        let ch = c.snippet;
        let no = ch.resourceId.channelId;
        //   console.log(ch.resourceId.channelId);
        //   setAllchaID(no);
        channels.push(no);
        // console.log(no);
      });
      // console.log(channels);

      if (!tk) {
        break;
      }
    }
  };

  // onlychannelId(pageToken);

  const isSuborNot = (id) => {
    let is = channels.indexOf(id);

    if (is !== -1) {
      console.log("found");
    } else {
      console.log("not found");
    }
  };

  const ready = async () => {
    await newyou();
    // console.log(JSON.stringify(channels));
    // fs.writeFileSync("channels.json", JSON.stringify(channels));

    isSuborNot("UCXasdrB5mXEKEwT_mWT0bCQ");
  };

  ready();

  return <div>nenennene</div>;
}

export default NextExam;
