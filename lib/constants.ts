export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "全国驾培集训平台";

export const LICENSE_TYPES = ["C1", "C2", "D", "E", "B2", "A2"] as const;

export const PROVINCE_CITY_PAIRS = [
  ["广东省", "广州"],
  ["广东省", "深圳"],
  ["江苏省", "南京"],
  ["浙江省", "杭州"],
  ["山东省", "济南"],
  ["河南省", "郑州"],
  ["四川省", "成都"],
  ["湖北省", "武汉"],
  ["湖南省", "长沙"],
  ["陕西省", "西安"],
  ["河北省", "石家庄"],
  ["安徽省", "合肥"],
  ["福建省", "福州"],
  ["江西省", "南昌"],
  ["辽宁省", "沈阳"],
  ["云南省", "昆明"],
  ["贵州省", "贵阳"],
  ["广西壮族自治区", "南宁"],
  ["重庆市", "重庆"],
  ["天津市", "天津"],
  ["上海市", "上海"],
  ["北京市", "北京"]
] as const;

export const COMPLIANCE_CONFIRMATION =
  "我了解平台仅提供培训、住宿、餐饮、报到、进度跟踪和售后保障服务，不承诺包过、免考、代考或买卖驾驶证，考试预约及结果以当地交管部门规则为准。";

export const COMPLIANCE_NOTICE =
  "平台仅提供驾培课程、集训、住宿、餐饮、接站、报到、进度跟踪和售后保障服务；考试预约及考试结果以当地交管部门规则为准。";

export const ORDER_STATUS_LABEL: Record<string, string> = {
  PENDING_MATERIALS: "待提交资料",
  PENDING_BASE_CONFIRM: "待基地确认",
  PENDING_DEPOSIT: "待支付定金",
  DEPOSIT_PAID: "已支付定金",
  WAITING_CHECKIN: "待报到",
  CHECKED_IN: "已报到",
  STAYED_IN: "已入住",
  TRAINING: "训练中",
  EXAMING: "考试中",
  COMPLETED: "已结业",
  REFUNDING: "退款中",
  REFUNDED: "已退款",
  COMPLAINT: "投诉中",
  CLOSED: "已关闭"
};

export const PROGRESS_STAGE_LABEL: Record<string, string> = {
  MATERIAL_REVIEW: "报名资料审核",
  BASE_CONFIRM: "基地确认",
  CHECKIN: "到校报到",
  STAY: "入住状态",
  THEORY: "理论学习",
  FIELD_TRAINING: "场地训练",
  ROAD_TRAINING: "道路训练",
  EXAM_BOOKING: "考试预约提示",
  COMPLETED: "已结业"
};

export const ROLE_LABEL: Record<string, string> = {
  STUDENT: "学员",
  MERCHANT: "基地商户",
  OPERATOR: "区域运营",
  ADMIN: "平台管理员"
};

export const RISK_SOURCE_LABEL: Record<string, string> = {
  APPLICATION: "报名备注",
  FRANCHISE: "加盟申请",
  PACKAGE: "班型内容",
  REVIEW: "评价内容",
  COMPLAINT: "投诉内容",
  REFUND: "退款原因",
  BACKOFFICE: "后台编辑"
};
