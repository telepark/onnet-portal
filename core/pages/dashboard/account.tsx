import React from 'react';
import { connect } from 'umi';
import { Spin } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ReactPlayer from 'react-player/youtube'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Masonry from 'react-masonry-css';

import { masonryBreakpointCols } from '@/pages/onnet-portal/core/utils/props';

const AccountDashboard = (props) => {
  const { kz_account } = props;

  if (!kz_account.data) {
    return <Spin />;
  }

  return (
    <PageHeaderWrapper>
      Account dashboard <b>{kz_account.data.name}</b>
      <Masonry
        breakpointCols={masonryBreakpointCols}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
      <ReactPlayer url='https://www.youtube.com/watch?v=4G7JhzmaO_c' />
      <AudioPlayer
        style={{ width: '80%' }}
        src="/onnet_ext/servicesdeptgreeting.mp3"
        onPlay={e => console.log("onPlay")}
      />
      </Masonry>
    </PageHeaderWrapper>
  );
};

export default connect(({ kz_account }) => ({
  kz_account,
}))(AccountDashboard);
