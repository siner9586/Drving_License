import { PROVINCE_CITY_PAIRS } from "@/lib/constants";
import { idFromText } from "@/lib/utils";
import type {
  ApplicationView,
  CampPackageView,
  CampSessionView,
  CanteenView,
  ComplaintView,
  DashboardData,
  DormitoryView,
  EnterpriseLeadView,
  FranchiseApplicationView,
  FranchiseAuditView,
  MockDataset,
  OrderItemView,
  OrderStatus,
  OrderTimelineItem,
  OrderView,
  PlatformRuleView,
  ProgressStage,
  RefundView,
  RegionView,
  ReviewView,
  RiskEventView,
  StudentProgressView,
  TrainingBaseView
} from "@/lib/types";

const coverImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&w=1400&q=80"
];

const baseNames = [
  "华东认证集训基地 A",
  "华南认证集训基地 B",
  "华北认证集训基地 C",
  "西南认证集训基地 D",
  "中部认证集训基地 E",
  "西北认证集训基地 F",
  "珠三角认证集训基地 G",
  "长三角认证集训基地 H",
  "成渝认证集训基地 I",
  "环渤海认证集训基地 J",
  "海峡认证集训基地 K",
  "滇黔认证集训基地 L"
];

const packageTemplates = [
  {
    name: "C1 标准集训班",
    licenseType: "C1",
    targetUsers: "希望集中安排练车时间的学员",
    durationText: "20-35 天弹性训练周期",
    price: 4680,
    items: ["集中训练排班", "班主任跟进", "训练进度记录", "报到协助"]
  },
  {
    name: "C2 自动挡集训班",
    licenseType: "C2",
    targetUsers: "偏好自动挡训练车辆的学员",
    durationText: "18-32 天弹性训练周期",
    price: 4980,
    items: ["自动挡教练车", "高频训练时段", "住宿餐饮可选", "考试预约提醒"]
  },
  {
    name: "学生寒暑假班",
    licenseType: "C1",
    targetUsers: "寒暑假时间集中的学生学员",
    durationText: "假期集中训练排期",
    price: 4380,
    items: ["假期班次", "同龄学员分组", "宿舍床位预留", "训练日报"]
  },
  {
    name: "上班族请假集训班",
    licenseType: "C2",
    targetUsers: "需要短期请假集中练车的上班族",
    durationText: "工作日集中训练",
    price: 5280,
    items: ["请假周期排班", "重点科目强化", "报到材料清单", "售后跟进"]
  },
  {
    name: "女生安心住宿班",
    licenseType: "C2",
    targetUsers: "关注住宿管理和女生分区的学员",
    durationText: "含女生宿舍床位排期",
    price: 5680,
    items: ["女生宿舍分区", "门禁管理", "班主任晚间巡查", "餐饮套餐可选"]
  },
  {
    name: "摩托车 D/E 集训班",
    licenseType: "D",
    targetUsers: "需要摩托车车型训练的学员",
    durationText: "7-15 天训练安排",
    price: 1980,
    items: ["D/E 车型训练", "场地项目练习", "资料提交协助", "报到指引"]
  },
  {
    name: "异地转学/续考服务",
    licenseType: "C1",
    targetUsers: "已有学籍或训练记录需继续训练的学员",
    durationText: "按资料审核结果安排",
    price: 3280,
    items: ["资料核验", "训练计划衔接", "基地确认", "进度跟踪"]
  },
  {
    name: "企业司机团训班",
    licenseType: "B2",
    targetUsers: "企业批量司机培训需求",
    durationText: "按企业排班定制",
    price: 7800,
    items: ["企业专属排班", "集中住宿餐饮", "团队进度报表", "安全课程"]
  },
  {
    name: "拿证后新手上路陪练服务",
    licenseType: "C1",
    targetUsers: "已取得驾驶资格后需要道路陪练的用户",
    durationText: "6-20 课时可选",
    price: 1680,
    items: ["真实道路陪练", "停车入库强化", "市区路线熟悉", "安全驾驶习惯"]
  },
  {
    name: "周末强化训练班",
    licenseType: "C1",
    targetUsers: "工作日时间有限的学员",
    durationText: "周末固定时段",
    price: 3980,
    items: ["周末排班", "预约式训练", "进度复盘", "可选住宿"]
  },
  {
    name: "考前模拟强化班",
    licenseType: "C2",
    targetUsers: "需要在考试前熟悉流程的学员",
    durationText: "2-5 天强化训练",
    price: 1380,
    items: ["模拟训练", "扣分点复盘", "教练点评", "规则提醒"]
  },
  {
    name: "企业防御性驾驶培训班",
    licenseType: "A2",
    targetUsers: "物流、运输、通勤车队管理方",
    durationText: "1-3 天安全课程",
    price: 6800,
    items: ["防御性驾驶课程", "事故案例复盘", "车队安全制度", "培训签到"]
  }
];

const studentNames = [
  "李明",
  "王璐",
  "陈浩",
  "赵晴",
  "刘洋",
  "周莹",
  "吴凡",
  "郑欣",
  "孙磊",
  "胡敏",
  "朱杰",
  "高琳"
];

const orderStatuses: OrderStatus[] = [
  "PENDING_MATERIALS",
  "PENDING_BASE_CONFIRM",
  "PENDING_DEPOSIT",
  "DEPOSIT_PAID",
  "WAITING_CHECKIN",
  "CHECKED_IN",
  "STAYED_IN",
  "TRAINING",
  "EXAMING",
  "COMPLETED",
  "REFUNDING",
  "COMPLAINT"
];

const progressStages: ProgressStage[] = [
  "MATERIAL_REVIEW",
  "BASE_CONFIRM",
  "CHECKIN",
  "STAY",
  "THEORY",
  "FIELD_TRAINING",
  "ROAD_TRAINING",
  "EXAM_BOOKING",
  "COMPLETED"
];

function isoDate(offsetDays: number) {
  const date = new Date("2026-07-01T08:00:00.000Z");
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString();
}

function createRegions(): RegionView[] {
  const provinces = Array.from(new Set(PROVINCE_CITY_PAIRS.map(([province]) => province)));
  const provinceRows = provinces.map((province, index) => ({
    id: idFromText("region_province", index),
    name: province,
    code: `P${String(index + 1).padStart(2, "0")}`,
    type: "PROVINCE" as const
  }));
  const cityRows = PROVINCE_CITY_PAIRS.map(([province, city], index) => {
    const parent = provinceRows.find((row) => row.name === province);
    return {
      id: idFromText("region_city", index),
      name: city,
      code: `C${String(index + 1).padStart(3, "0")}`,
      type: "CITY" as const,
      parentId: parent?.id
    };
  });
  return [...provinceRows, ...cityRows];
}

function createBaseShells(): TrainingBaseView[] {
  return baseNames.map((name, index) => {
    const [province, city] = PROVINCE_CITY_PAIRS[index % PROVINCE_CITY_PAIRS.length];
    const totalBeds = 110 + index * 18;
    const availableBeds = 30 + (index % 6) * 12;
    return {
      id: idFromText("base", index),
      schoolId: idFromText("school", index),
      name,
      slug: `certified-camp-${String(index + 1).padStart(2, "0")}`,
      level: index % 4 === 0 ? "A" : index % 4 === 1 ? "B" : "C",
      province,
      city,
      address: `${city}示范训练路 ${index + 18} 号`,
      summary: "演示认证基地，展示宿舍、食堂、训练场、教练团队和全国学员接待能力。",
      description:
        "该基地为平台 demo 数据，用于演示驾培集训服务闭环。基地以集中训练、食宿安排、报到管理、训练进度跟踪和售后保障为核心，不涉及驾驶证交易。",
      coverImage: coverImages[index % coverImages.length],
      verified: true,
      status: index % 6 === 0 ? "FULL" : "ACTIVE",
      trainingFieldArea: 12000 + index * 2200,
      coachCount: 8 + index,
      vehicleCount: 12 + index * 2,
      totalBeds,
      availableBeds,
      canteenCapacity: 180 + index * 35,
      dailyStudentCapacity: 18 + index,
      monthlyStudentCapacity: 180 + index * 20,
      supportsAccommodation: true,
      supportsMeals: true,
      supportsPickup: index % 3 !== 1,
      supportsFemaleDorm: index % 2 === 0,
      supportsEnterpriseTraining: index % 3 !== 2,
      rating: Number((4.5 + (index % 5) * 0.06).toFixed(1)),
      complaintRate: Number((0.006 + (index % 4) * 0.002).toFixed(3)),
      refundRate: Number((0.012 + (index % 5) * 0.002).toFixed(3)),
      priceMin: 0,
      priceMax: 0,
      suitableUsers: ["全国异地学员", "假期学员", "上班族", index % 2 === 0 ? "女生住宿学员" : "企业团训"],
      dormitories: [],
      canteens: [],
      coaches: [],
      vehicles: [],
      sessions: [],
      capacityCalendar: [],
      reviews: []
    };
  });
}

function attachBaseFacilities(bases: TrainingBaseView[]) {
  bases.forEach((base, index) => {
    const dormitory: DormitoryView = {
      id: idFromText("dormitory", index),
      baseId: base.id,
      baseName: base.name,
      name: `${base.city}学员宿舍楼`,
      description: "演示宿舍数据，提供 2 人间、4 人间、6 人间，支持男女分区和门禁管理。",
      totalBeds: base.totalBeds,
      availableBeds: base.availableBeds,
      hasAirConditioning: true,
      hasPrivateBathroom: index % 3 !== 1,
      hasHotWater: true,
      hasLaundry: true,
      genderSeparated: true,
      hasAccessControl: true,
      managerOnDuty: true,
      pricePerDay: 55 + index * 3,
      rules: "入住需完成报到登记，退宿按实际入住天数结算，贵重物品自行妥善保管。",
      rooms: [
        {
          id: `${idFromText("room", index)}_2`,
          roomType: "2 人间",
          capacity: 2,
          totalRooms: 12 + index,
          availableRooms: 3 + (index % 4),
          pricePerDay: 95 + index * 4,
          features: ["空调", "热水", "独立储物柜"]
        },
        {
          id: `${idFromText("room", index)}_4`,
          roomType: "4 人间",
          capacity: 4,
          totalRooms: 20 + index,
          availableRooms: 6 + (index % 5),
          pricePerDay: 65 + index * 3,
          features: ["空调", "洗衣机", "门禁"]
        },
        {
          id: `${idFromText("room", index)}_6`,
          roomType: "6 人间",
          capacity: 6,
          totalRooms: 16 + index,
          availableRooms: 5 + (index % 4),
          pricePerDay: 45 + index * 2,
          features: ["公共卫浴", "热水", "班主任管理"]
        }
      ]
    };

    const canteen: CanteenView = {
      id: idFromText("canteen", index),
      baseId: base.id,
      baseName: base.name,
      name: `${base.city}训练基地食堂`,
      description: "演示食堂数据，提供早中晚餐，支持企业团餐和特殊饮食备注。",
      dailyCapacity: base.canteenCapacity,
      mealCountPerDay: 3,
      supportsHalal: index % 4 === 0,
      supportsVegetarian: true,
      supportsEnterpriseMeal: base.supportsEnterpriseTraining,
      foodSafetyNote: "食堂执行留样、台账、从业人员健康管理和明厨亮灶制度。",
      complaintChannel: "平台订单详情页、基地服务台、400 演示热线",
      mealPlans: [
        {
          id: `${idFromText("meal", index)}_basic`,
          name: "基础三餐餐标",
          pricePerDay: 38 + index,
          meals: ["早餐", "午餐", "晚餐"],
          description: "适合常规集训学员，按天购买或随班型包含。"
        },
        {
          id: `${idFromText("meal", index)}_plus`,
          name: "营养升级餐标",
          pricePerDay: 58 + index,
          meals: ["早餐", "午餐", "晚餐", "训练补给"],
          description: "适合训练强度较高或企业团训学员。"
        }
      ]
    };

    base.dormitories = [dormitory];
    base.canteens = [canteen];
    base.coaches = Array.from({ length: 4 }, (_, coachIndex) => ({
      id: `${idFromText("coach", index)}_${coachIndex + 1}`,
      baseId: base.id,
      name: `${["张", "李", "王", "陈"][coachIndex]}教练 ${index + 1}`,
      gender: coachIndex % 2 === 0 ? "男" : "女",
      years: 5 + coachIndex + (index % 6),
      licenseTypes: coachIndex % 3 === 0 ? ["C1", "C2", "B2"] : ["C1", "C2"],
      tags: ["耐心讲解", "进度复盘", coachIndex % 2 === 0 ? "企业团训" : "女生班经验"],
      rating: Number((4.6 + coachIndex * 0.07).toFixed(1)),
      studentCount: 240 + index * 18 + coachIndex * 26,
      complaintCount: coachIndex % 3
    }));
    base.vehicles = Array.from({ length: 5 }, (_, vehicleIndex) => ({
      id: `${idFromText("vehicle", index)}_${vehicleIndex + 1}`,
      baseId: base.id,
      plateNo: `演${base.city.slice(0, 1)}${index}${vehicleIndex}${String(100 + vehicleIndex)}`,
      vehicleType: vehicleIndex % 5 === 0 ? "B2" : vehicleIndex % 3 === 0 ? "C2" : "C1",
      trainingType: vehicleIndex % 3 === 0 ? "自动挡训练" : "手动挡训练",
      status: vehicleIndex === 4 && index % 4 === 0 ? "MAINTENANCE" : "AVAILABLE"
    }));
    base.capacityCalendar = Array.from({ length: 14 }, (_, dayIndex) => ({
      id: `${idFromText("capacity", index)}_${dayIndex + 1}`,
      baseId: base.id,
      date: isoDate(dayIndex),
      newStudentCapacity: Math.max(0, base.dailyStudentCapacity - (dayIndex % 5)),
      availableBeds: Math.max(0, base.availableBeds - dayIndex * 2),
      availableVehicles: Math.max(2, base.vehicleCount - (dayIndex % 6)),
      availableCoaches: Math.max(2, base.coachCount - (dayIndex % 5)),
      sessionSeats: Math.max(0, 36 - dayIndex * 2 - (index % 4)),
      warningLevel: dayIndex > 10 ? "WARNING" : dayIndex > 7 ? "WATCH" : "NORMAL"
    }));
  });
}

function createPackages(bases: TrainingBaseView[]) {
  const packages: CampPackageView[] = [];
  bases.forEach((base, baseIndex) => {
    const templates = [
      packageTemplates[baseIndex % packageTemplates.length],
      packageTemplates[(baseIndex + 1) % packageTemplates.length],
      packageTemplates[(baseIndex + 5) % packageTemplates.length]
    ];
    templates.forEach((template, templateIndex) => {
      const index = packages.length;
      const includesAccommodation = templateIndex !== 2;
      const includesMeals = templateIndex !== 1;
      const sessions: CampSessionView[] = Array.from({ length: 2 }, (_, sessionIndex) => ({
        id: `${idFromText("session", index)}_${sessionIndex + 1}`,
        packageId: idFromText("package", index),
        baseId: base.id,
        startDate: isoDate(7 + sessionIndex * 14 + templateIndex),
        endDate: isoDate(26 + sessionIndex * 14 + templateIndex),
        capacity: 36,
        remainingSeats: Math.max(3, 26 - baseIndex - sessionIndex * 4),
        status: sessionIndex === 1 && baseIndex % 5 === 0 ? "FULL" : "OPEN"
      }));
      const pack: CampPackageView = {
        id: idFromText("package", index),
        baseId: base.id,
        categoryId: `category_${template.licenseType}`,
        baseName: base.name,
        baseProvince: base.province,
        baseCity: base.city,
        name: template.name,
        slug: `${base.slug}-${template.name.replace(/[ /]/g, "-").toLowerCase()}-${templateIndex + 1}`,
        licenseType: template.licenseType,
        targetUsers: template.targetUsers,
        description: `该班型为 ${base.name} 的 demo 服务，面向${template.targetUsers}，提供训练排班、报到、食宿和进度跟踪等服务。`,
        price: template.price + baseIndex * 120 + templateIndex * 80,
        trainingFee: template.price - 900 + templateIndex * 50,
        dormitoryFee: includesAccommodation ? 900 + baseIndex * 20 : 0,
        mealFee: includesMeals ? 720 + baseIndex * 15 : 0,
        pickupFee: base.supportsPickup ? 120 + templateIndex * 30 : 0,
        examFeeNote: "体检、考试规费、模拟训练、补考等按当地规则和学员实际选择结算。",
        includesAccommodation,
        includesMeals,
        supportsPickup: base.supportsPickup,
        durationText: template.durationText,
        serviceItems: template.items,
        trainingPlan: ["资料核验", "分阶段训练", "教练复盘", "考试预约提醒", "结业回访"],
        accommodationPlan: includesAccommodation ? "包含基础床位，升级房型按差价补收。" : "住宿可按天另行选择。",
        mealPlan: includesMeals ? "包含基础三餐餐标，升级餐标可另行选择。" : "餐饮可按天另行购买。",
        pickupPlan: base.supportsPickup ? "支持指定车站或机场预约接站，按确认时间执行。" : "该基地暂不提供接站服务。",
        registrationMaterials: ["身份证明材料", "体检相关材料", "原培训资料（如转学/续考）", "企业团训名单（如适用）"],
        valueAddedServices: ["房型升级", "营养餐升级", "道路陪练", "企业培训报表"],
        notIncludedItems: ["体检费", "考试规费", "模拟费", "补考费", "个人生活用品"],
        refundRule: "未报到前可按规则申请退款；已发生的住宿、餐饮、接站、训练等服务费用按实际发生扣除。",
        complianceNote: "不承诺包过、免考、代考或买卖驾驶证，考试预约及结果以当地交管部门规则为准。",
        remainingSeats: sessions.reduce((sum, item) => sum + item.remainingSeats, 0),
        status: sessions.every((item) => item.status === "FULL") ? "SOLD_OUT" : "ACTIVE",
        sessions
      };
      packages.push(pack);
      base.sessions.push(...sessions);
    });
    const relatedPrices = packages.filter((item) => item.baseId === base.id).map((item) => item.price);
    base.priceMin = Math.min(...relatedPrices);
    base.priceMax = Math.max(...relatedPrices);
  });
  return packages;
}

function createApplications(bases: TrainingBaseView[], packages: CampPackageView[]): ApplicationView[] {
  return Array.from({ length: 54 }, (_, index) => {
    const pack = packages[index % packages.length];
    const base = bases.find((item) => item.id === pack.baseId) ?? bases[0];
    const [province, city] = PROVINCE_CITY_PAIRS[(index + 3) % PROVINCE_CITY_PAIRS.length];
    return {
      id: idFromText("application", index),
      studentName: studentNames[index % studentNames.length],
      phone: `1380000${String(1000 + index)}`,
      province,
      city,
      targetLicenseType: pack.licenseType,
      baseId: base.id,
      packageId: pack.id,
      needAccommodation: pack.includesAccommodation,
      needMeals: pack.includesMeals,
      needPickup: index % 3 === 0,
      expectedArrivalDate: isoDate(8 + (index % 16)),
      isEnterprise: index % 12 === 0,
      enterpriseName: index % 12 === 0 ? `演示物流企业 ${index / 12 + 1}` : undefined,
      enterpriseSize: index % 12 === 0 ? 12 + index : undefined,
      note: index % 10 === 0 ? "希望确认女生宿舍床位和接站时间。" : "请协助确认报到材料。",
      status: index % 9 === 0 ? "RISK_REVIEW" : index % 5 === 0 ? "CONFIRMED" : "SUBMITTED",
      riskFlag: index % 9 === 0,
      createdAt: isoDate(-index)
    };
  });
}

function createOrderItems(pack: CampPackageView): OrderItemView[] {
  const items: OrderItemView[] = [
    {
      id: `${pack.id}_item_training`,
      type: "TRAINING",
      name: "培训服务",
      amount: pack.trainingFee,
      description: "包含训练排班、教练服务、进度跟踪和报到协助。"
    }
  ];
  if (pack.dormitoryFee > 0) {
    items.push({
      id: `${pack.id}_item_dormitory`,
      type: "DORMITORY",
      name: "住宿服务",
      amount: pack.dormitoryFee,
      description: "基础床位费用，升级房型按实际选择结算。"
    });
  }
  if (pack.mealFee > 0) {
    items.push({
      id: `${pack.id}_item_meal`,
      type: "MEAL",
      name: "餐饮服务",
      amount: pack.mealFee,
      description: "基础餐标费用，特殊餐食按基地确认。"
    });
  }
  if (pack.pickupFee > 0) {
    items.push({
      id: `${pack.id}_item_pickup`,
      type: "PICKUP",
      name: "接站服务",
      amount: pack.pickupFee,
      description: "指定站点预约接站，按确认单执行。"
    });
  }
  items.push({
    id: `${pack.id}_item_service`,
    type: "SERVICE",
    name: "平台服务保障",
    amount: Math.max(120, Math.round(pack.price * 0.03)),
    description: "订单跟踪、投诉退款入口和售后协同。"
  });
  return items;
}

function createOrders(bases: TrainingBaseView[], packages: CampPackageView[]): OrderView[] {
  return Array.from({ length: 42 }, (_, index) => {
    const pack = packages[index % packages.length];
    const base = bases.find((item) => item.id === pack.baseId) ?? bases[0];
    const status = orderStatuses[index % orderStatuses.length];
    const totalAmount = pack.price;
    const items = createOrderItems(pack);
    const timeline: OrderTimelineItem[] = [
      { time: isoDate(-10 + index), title: "提交报名", description: "学员提交报名信息并完成合规确认。" },
      { time: isoDate(-9 + index), title: "基地确认", description: "基地核对班型、床位和开班计划。" },
      { time: isoDate(-8 + index), title: "订单生成", description: "系统生成演示订单并展示下一步事项。" }
    ];
    return {
      id: idFromText("order", index),
      orderNo: `DL202607${String(10000 + index)}`,
      userId: idFromText("user", index),
      studentName: studentNames[index % studentNames.length],
      phoneTail: String(1000 + index).slice(-4),
      baseId: base.id,
      baseName: base.name,
      packageId: pack.id,
      packageName: pack.name,
      licenseType: pack.licenseType,
      accommodation: pack.includesAccommodation,
      meals: pack.includesMeals,
      pickup: pack.supportsPickup && index % 2 === 0,
      totalAmount,
      paidAmount: index % 3 === 0 ? Math.round(totalAmount * 0.3) : index % 4 === 0 ? totalAmount : 0,
      status,
      paymentStatus: index % 4 === 0 ? "PAID" : index % 3 === 0 ? "PARTIAL" : "UNPAID",
      checkinStatus: index % 5 === 0 ? "CHECKED_IN" : "NOT_ARRIVED",
      progressStatus: progressStages[index % progressStages.length],
      nextStep: index % 4 === 0 ? "等待基地更新训练进度" : "请按短信和订单提示完成报到准备",
      items,
      timeline,
      createdAt: isoDate(-index)
    };
  });
}

function createProgress(orders: OrderView[]): StudentProgressView[] {
  return orders.slice(0, 24).map((order, index) => ({
    id: idFromText("progress", index),
    orderId: order.id,
    orderNo: order.orderNo,
    studentName: order.studentName,
    baseName: order.baseName,
    packageName: order.packageName,
    currentStage: progressStages[(index + 2) % progressStages.length],
    theoryStatus: index % 3 === 0 ? "已完成学习记录" : "学习中",
    fieldTrainingStatus: index % 4 === 0 ? "已完成阶段复盘" : "按计划训练",
    roadTrainingStatus: index % 5 === 0 ? "待安排" : "基础路线练习中",
    examBookingNote: "考试预约及结果以当地交管部门规则为准，平台仅做提醒和记录。",
    nextStep: "按基地班主任通知完成下一阶段训练。",
    teacherNote: "训练动作稳定性提升中，建议保持连续练习。",
    managerNote: "住宿和餐饮状态正常，暂无服务异常。",
    updatedBy: "基地班主任",
    updatedAt: isoDate(-index)
  }));
}

function createReviews(bases: TrainingBaseView[], orders: OrderView[]): ReviewView[] {
  const reviews = orders.slice(0, 30).map((order, index) => ({
    id: idFromText("review", index),
    orderId: order.id,
    baseId: order.baseId,
    userId: order.userId,
    studentName: order.studentName,
    rating: 4 + (index % 2),
    content: "训练安排比较清楚，宿舍和食堂信息展示透明，班主任会同步阶段进度。",
    tags: ["信息透明", "食宿便利", index % 2 === 0 ? "进度跟踪" : "教练耐心"],
    status: "PUBLISHED",
    createdAt: isoDate(-index)
  }));
  bases.forEach((base) => {
    base.reviews = reviews.filter((review) => review.baseId === base.id).slice(0, 4);
  });
  return reviews;
}

function createComplaints(orders: OrderView[]): ComplaintView[] {
  return orders.slice(0, 12).map((order, index) => ({
    id: idFromText("complaint", index),
    orderId: order.id,
    orderNo: order.orderNo,
    studentName: order.studentName,
    baseId: order.baseId,
    baseName: order.baseName,
    type: index % 3 === 0 ? "住宿服务" : index % 3 === 1 ? "排班沟通" : "餐饮服务",
    severity: index % 5 === 0 ? "HIGH" : index % 2 === 0 ? "MEDIUM" : "LOW",
    content: "学员反馈服务细节需进一步确认，平台已转交基地处理并保留跟进记录。",
    status: index % 4 === 0 ? "ARBITRATING" : "PROCESSING",
    resolution: index % 4 === 0 ? "平台运营介入复核服务记录。" : "基地需在 24 小时内补充说明。"
  }));
}

function createRefunds(orders: OrderView[]): RefundView[] {
  return orders.slice(6, 16).map((order, index) => ({
    id: idFromText("refund", index),
    orderId: order.id,
    orderNo: order.orderNo,
    studentName: order.studentName,
    reason: "个人行程调整，申请按平台退款规则核算未发生服务费用。",
    requestedAmount: Math.round(order.totalAmount * 0.5),
    approvedAmount: index % 3 === 0 ? Math.round(order.totalAmount * 0.42) : 0,
    status: index % 3 === 0 ? "APPROVED" : "REVIEWING",
    note: "住宿、餐饮、接站等已发生费用需按实际扣除。"
  }));
}

function createFranchiseApplications(): FranchiseApplicationView[] {
  return Array.from({ length: 15 }, (_, index) => {
    const [province, city] = PROVINCE_CITY_PAIRS[(index + 5) % PROVINCE_CITY_PAIRS.length];
    return {
      id: idFromText("franchise", index),
      schoolName: `${city}演示加盟驾校 ${index + 1}`,
      province,
      city,
      licenseNo: `LIC-DEMO-${String(3000 + index)}`,
      filingNo: `FILE-DEMO-${String(5000 + index)}`,
      trainingFieldAddress: `${city}训练场路 ${60 + index} 号`,
      trainingFieldArea: 9000 + index * 800,
      coachCount: 6 + index,
      vehicleCount: 10 + index,
      licenseTypes: index % 3 === 0 ? ["C1", "C2", "D"] : ["C1", "C2"],
      hasDormitory: index % 4 !== 1,
      bedCount: 60 + index * 12,
      hasCanteen: index % 5 !== 2,
      canteenCapacity: 120 + index * 20,
      supportsPickup: index % 2 === 0,
      supportsFemaleDorm: index % 3 !== 0,
      safetyDescription: "已建立训练场巡检、宿舍门禁、消防器材巡查和车辆安全检查制度。",
      foodSafetyDescription: "食堂按留样、台账、从业人员健康证明和投诉处理制度管理。",
      priceDescription: "培训、住宿、餐饮、接站、模拟和其他费用分项公示。",
      contractDescription: "拟使用平台标准合同并明确双方服务边界。",
      refundDescription: "支持按未发生服务核算退款，保留平台仲裁入口。",
      canServeNationalStudents: index % 4 !== 0,
      contactName: `${["何", "罗", "谢", "郭"][index % 4]}负责人`,
      contactPhone: `1390000${String(2000 + index)}`,
      status: index % 5 === 0 ? "MATERIAL_REQUIRED" : index % 4 === 0 ? "TRIAL" : "SUBMITTED",
      riskFlag: index % 7 === 0
    };
  });
}

function createFranchiseAudits(applications: FranchiseApplicationView[]): FranchiseAuditView[] {
  return applications.slice(0, 10).map((application, index) => ({
    id: idFromText("franchise_audit", index),
    applicationId: application.id,
    stage: index % 3 === 0 ? "MATERIAL" : index % 3 === 1 ? "FIELD_CHECK" : "SAFETY",
    status: index % 4 === 0 ? "NEED_MORE" : "PENDING",
    auditor: index % 2 === 0 ? "平台审核员 A" : "区域运营 B",
    note: index % 4 === 0 ? "需补充食堂资质和消防巡检记录。" : "资料进入初审队列。"
  }));
}

function createEnterpriseLeads(): EnterpriseLeadView[] {
  return Array.from({ length: 8 }, (_, index) => {
    const [province, city] = PROVINCE_CITY_PAIRS[(index + 8) % PROVINCE_CITY_PAIRS.length];
    return {
      id: idFromText("enterprise", index),
      companyName: `${city}演示运输企业 ${index + 1}`,
      contactName: `${["梁", "许", "丁", "姚"][index % 4]}经理`,
      phone: `1370000${String(3000 + index)}`,
      province,
      city,
      studentCount: 12 + index * 5,
      targetLicenseType: index % 3 === 0 ? "B2" : "C1",
      needAccommodation: index % 2 === 0,
      needMeals: true,
      expectedTrainingDate: isoDate(18 + index * 3),
      note: "希望集中排班并提供企业培训进度报表。",
      status: index % 3 === 0 ? "CONTACTED" : "NEW"
    };
  });
}

function createRiskEvents(): RiskEventView[] {
  const keywords = ["包过", "买证", "代考", "免考", "内部名额", "考试答案", "保证拿证", "不用考试", "假证", "伪造"];
  return keywords.map((keyword, index) => ({
    id: idFromText("risk", index),
    sourceType: index % 2 === 0 ? "APPLICATION" : "FRANCHISE",
    sourceId: index % 2 === 0 ? idFromText("application", index) : idFromText("franchise", index),
    keyword,
    contentSnippet: `演示风险内容命中“${keyword}”，该词仅用于风控样例和禁售禁发规则展示。`,
    riskLevel: index % 3 === 0 ? "CRITICAL" : "HIGH",
    status: index % 4 === 0 ? "BLOCKED" : "OPEN",
    createdAt: isoDate(-index)
  }));
}

function createRules(): PlatformRuleView[] {
  const rows = [
    ["USER_AGREEMENT", "用户服务协议", "明确平台服务范围、用户义务、信息真实性和争议处理方式。"],
    ["TRANSACTION", "平台交易规则", "培训、住宿、餐饮、接站和保障服务需分项展示、分项核算。"],
    ["ENROLLMENT", "报名规则", "学员报名需提交真实信息，并完成合规确认后进入基地确认流程。"],
    ["REFUND", "退款规则", "退款按未发生服务和合同约定核算，已发生服务据实扣除。"],
    ["COMPLAINT", "投诉仲裁规则", "投诉进入平台工单，基地需限时响应，平台可介入仲裁。"],
    ["REVIEW", "评价规则", "评价需基于真实服务体验，禁止发布违法违规或侵犯隐私内容。"],
    ["PROHIBITED", "禁售禁发规则", "禁止买证、卖证、代考、免考、考试答案、伪造等违法违规内容。"],
    ["FRANCHISE", "加盟基地审核规则", "加盟驾校需通过主体资质、备案、场地、教练、车辆、食宿和安全审核。"],
    ["SAFETY", "食宿安全说明", "宿舍、食堂、车辆和训练场需执行安全管理与投诉处理制度。"],
    ["PRIVACY", "隐私政策", "手机号、证件信息、订单资料等敏感信息最小化采集并进行权限隔离。"]
  ] as const;
  return rows.map(([type, title, content], index) => ({
    id: idFromText("rule", index),
    type,
    title,
    content,
    version: "v1.0-demo",
    published: true,
    updatedAt: isoDate(-index)
  }));
}

let cachedDataset: MockDataset | null = null;

export function getMockDataset(): MockDataset {
  if (cachedDataset) return cachedDataset;

  const regions = createRegions();
  const bases = createBaseShells();
  attachBaseFacilities(bases);
  const packages = createPackages(bases);
  const applications = createApplications(bases, packages);
  const orders = createOrders(bases, packages);
  const progress = createProgress(orders);
  const reviews = createReviews(bases, orders);
  const complaints = createComplaints(orders);
  const refunds = createRefunds(orders);
  const franchiseApplications = createFranchiseApplications();
  const franchiseAudits = createFranchiseAudits(franchiseApplications);
  const enterpriseLeads = createEnterpriseLeads();
  const riskEvents = createRiskEvents();
  const rules = createRules();

  cachedDataset = {
    regions,
    bases,
    packages,
    dormitories: bases.flatMap((base) => base.dormitories),
    canteens: bases.flatMap((base) => base.canteens),
    applications,
    orders,
    progress,
    complaints,
    refunds,
    reviews,
    franchiseApplications,
    franchiseAudits,
    enterpriseLeads,
    riskEvents,
    rules
  };

  return cachedDataset;
}

export function getAdminDashboard(): DashboardData {
  const data = getMockDataset();
  const gmv = data.orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const availableBeds = data.bases.reduce((sum, base) => sum + base.availableBeds, 0);
  const totalBeds = data.bases.reduce((sum, base) => sum + base.totalBeds, 0);
  return {
    metrics: [
      { label: "今日报名", value: "18", helper: "demo 同比 +12%" },
      { label: "本月报名", value: String(data.applications.length), helper: "覆盖 20+ 省市" },
      { label: "总 GMV", value: `¥${Math.round(gmv / 10000)}万`, helper: "培训与食宿服务合计" },
      { label: "认证基地数量", value: String(data.bases.length), helper: "全部为 demo 认证状态" },
      { label: "待审核加盟申请", value: String(data.franchiseApplications.filter((item) => item.status !== "APPROVED").length), helper: "含资料补充和试运营" },
      { label: "可用床位", value: String(availableBeds), helper: "全国基地合计" },
      { label: "当前入住率", value: `${Math.round((1 - availableBeds / totalBeds) * 100)}%`, helper: "按演示床位计算" },
      { label: "训练中学员", value: "126", helper: "含理论、场地、道路阶段" },
      { label: "投诉率", value: "0.9%", helper: "平台仲裁跟进" },
      { label: "退款率", value: "1.8%", helper: "按规则核算" },
      { label: "风控事件数", value: String(data.riskEvents.length), helper: "禁词命中样例" },
      { label: "企业团训线索数", value: String(data.enterpriseLeads.length), helper: "物流与车队客户" }
    ],
    bases: data.bases,
    orders: data.orders,
    complaints: data.complaints,
    refunds: data.refunds,
    franchiseApplications: data.franchiseApplications,
    franchiseAudits: data.franchiseAudits,
    riskEvents: data.riskEvents,
    enterpriseLeads: data.enterpriseLeads,
    rules: data.rules
  };
}

export function getMerchantDashboard(): DashboardData {
  const data = getMockDataset();
  const base = data.bases[0];
  return {
    ...getAdminDashboard(),
    metrics: [
      { label: "今日新报名", value: "6", helper: base.name },
      { label: "当前在校学员", value: "42", helper: "含住宿学员 31 人" },
      { label: "剩余床位", value: String(base.availableBeds), helper: "男女分区可用" },
      { label: "可用车辆", value: String(base.vehicles.filter((item) => item.status === "AVAILABLE").length), helper: "维护车辆已排除" },
      { label: "可用教练", value: String(base.coaches.length), helper: "今日排班容量正常" },
      { label: "今日用餐人数", value: "96", helper: "基础餐标 72 人" },
      { label: "本月 GMV", value: "¥38万", helper: "demo 订单汇总" },
      { label: "投诉数", value: "2", helper: "均在处理中" },
      { label: "退款数", value: "1", helper: "按规则核算" }
    ],
    bases: [base],
    orders: data.orders.filter((order) => order.baseId === base.id),
    complaints: data.complaints.filter((item) => item.baseId === base.id),
    refunds: data.refunds
  };
}

export function getOperatorDashboard(): DashboardData {
  const data = getMockDataset();
  const regionBases = data.bases.filter((base) => ["广东省", "广西壮族自治区", "福建省"].includes(base.province));
  return {
    ...getAdminDashboard(),
    metrics: [
      { label: "区域报名", value: "31", helper: "华南区域 demo" },
      { label: "区域订单", value: String(data.orders.filter((order) => regionBases.some((base) => base.id === order.baseId)).length), helper: "含企业团训订单" },
      { label: "区域投诉", value: "3", helper: "需运营跟进" },
      { label: "区域退款", value: "2", helper: "规则核算中" },
      { label: "企业团训线索", value: "4", helper: "物流客户为主" },
      { label: "加盟初审", value: "5", helper: "含资料补充" },
      { label: "容量预警", value: "2", helper: "周末床位紧张" },
      { label: "区域 GMV", value: "¥96万", helper: "demo 汇总" }
    ],
    bases: regionBases,
    orders: data.orders.filter((order) => regionBases.some((base) => base.id === order.baseId))
  };
}
