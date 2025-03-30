import mitt from 'mitt';

// 定义事件类型
type Events = {
  'update-tag-params': any;
  'resume-upload-success': string;
};

const eventBus = mitt<Events>();

export default eventBus;
