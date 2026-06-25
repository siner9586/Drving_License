import { Prisma } from "@prisma/client";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import {
  getAdminDashboard,
  getMerchantDashboard,
  getMockDataset,
  getOperatorDashboard
} from "@/lib/mock-data";
import { detectRisk, riskSnippet } from "@/lib/risk";
import type {
  ApplicationView,
  CampPackageView,
  CampSessionView,
  CanteenView,
  DashboardData,
  DormitoryView,
  OrderItemView,
  OrderView,
  RiskEventView,
  TrainingBaseView
} from "@/lib/types";

const baseInclude = {
  dormitories: { include: { rooms: true } },
  canteens: { include: { mealPlans: true } },
  coaches: true,
  vehicles: true,
  sessions: true,
  capacityCalendar: true,
  reviews: { include: { user: true }, take: 6, orderBy: { createdAt: "desc" as const } },
  packages: true
} satisfies Prisma.TrainingBaseInclude;

const packageInclude = {
  base: true,
  sessions: true
} satisfies Prisma.CampPackageInclude;

const orderInclude = {
  base: true,
  package: true,
  user: true,
  items: true
} satisfies Prisma.OrderInclude;

type PrismaBase = Prisma.TrainingBaseGetPayload<{ include: typeof baseInclude }>;
type PrismaPackage = Prisma.CampPackageGetPayload<{ include: typeof packageInclude }>;
type PrismaOrder = Prisma.OrderGetPayload<{ include: typeof orderInclude }>;

function mapSession(session: PrismaBase["sessions"][number] | PrismaPackage["sessions"][number]): CampSessionView {
  return {
    id: session.id,
    packageId: session.packageId,
    baseId: session.baseId,
    startDate: session.startDate.toISOString(),
    endDate: session.endDate.toISOString(),
    capacity: session.capacity,
    remainingSeats: session.remainingSeats,
    status: session.status
  };
}

function mapBase(row: PrismaBase): TrainingBaseView {
  const packages = row.packages.map((item) => item.price);
  const dormitories: DormitoryView[] = row.dormitories.map((item) => ({
    id: item.id,
    baseId: row.id,
    baseName: row.name,
    name: item.name,
    description: item.description,
    totalBeds: item.totalBeds,
    availableBeds: item.availableBeds,
    hasAirConditioning: item.hasAirConditioning,
    hasPrivateBathroom: item.hasPrivateBathroom,
    hasHotWater: item.hasHotWater,
    hasLaundry: item.hasLaundry,
    genderSeparated: item.genderSeparated,
    hasAccessControl: item.hasAccessControl,
    managerOnDuty: item.managerOnDuty,
    pricePerDay: item.pricePerDay,
    rules: item.rules,
    rooms: item.rooms.map((room) => ({
      id: room.id,
      roomType: room.roomType,
      capacity: room.capacity,
      totalRooms: room.totalRooms,
      availableRooms: room.availableRooms,
      pricePerDay: room.pricePerDay,
      features: room.features
    }))
  }));
  const canteens: CanteenView[] = row.canteens.map((item) => ({
    id: item.id,
    baseId: row.id,
    baseName: row.name,
    name: item.name,
    description: item.description,
    dailyCapacity: item.dailyCapacity,
    mealCountPerDay: item.mealCountPerDay,
    supportsHalal: item.supportsHalal,
    supportsVegetarian: item.supportsVegetarian,
    supportsEnterpriseMeal: item.supportsEnterpriseMeal,
    foodSafetyNote: item.foodSafetyNote,
    complaintChannel: item.complaintChannel,
    mealPlans: item.mealPlans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      pricePerDay: plan.pricePerDay,
      meals: plan.meals,
      description: plan.description
    }))
  }));

  return {
    id: row.id,
    schoolId: row.schoolId,
    name: row.name,
    slug: row.slug,
    level: row.level,
    province: row.province,
    city: row.city,
    address: row.address,
    summary: row.summary,
    description: row.description,
    coverImage: row.coverImage || "",
    verified: row.verified,
    status: row.status === "DRAFT" ? "PAUSED" : row.status,
    trainingFieldArea: row.trainingFieldArea,
    coachCount: row.coachCount,
    vehicleCount: row.vehicleCount,
    totalBeds: row.totalBeds,
    availableBeds: row.availableBeds,
    canteenCapacity: row.canteenCapacity,
    dailyStudentCapacity: row.dailyStudentCapacity,
    monthlyStudentCapacity: row.monthlyStudentCapacity,
    supportsAccommodation: row.supportsAccommodation,
    supportsMeals: row.supportsMeals,
    supportsPickup: row.supportsPickup,
    supportsFemaleDorm: row.supportsFemaleDorm,
    supportsEnterpriseTraining: row.supportsEnterpriseTraining,
    rating: row.rating,
    complaintRate: row.complaintRate,
    refundRate: row.refundRate,
    priceMin: packages.length ? Math.min(...packages) : 0,
    priceMax: packages.length ? Math.max(...packages) : 0,
    suitableUsers: ["全国异地学员", "集中训练学员", row.supportsEnterpriseTraining ? "企业团训" : "个人学员"],
    dormitories,
    canteens,
    coaches: row.coaches.map((coach) => ({
      id: coach.id,
      baseId: coach.baseId,
      name: coach.name,
      gender: coach.gender,
      years: coach.years,
      licenseTypes: coach.licenseTypes,
      tags: coach.tags,
      rating: coach.rating,
      studentCount: coach.studentCount,
      complaintCount: coach.complaintCount
    })),
    vehicles: row.vehicles.map((vehicle) => ({
      id: vehicle.id,
      baseId: vehicle.baseId,
      plateNo: vehicle.plateNo,
      vehicleType: vehicle.vehicleType,
      trainingType: vehicle.trainingType,
      status: vehicle.status
    })),
    sessions: row.sessions.map(mapSession),
    capacityCalendar: row.capacityCalendar.map((day) => ({
      id: day.id,
      baseId: day.baseId,
      date: day.date.toISOString(),
      newStudentCapacity: day.newStudentCapacity,
      availableBeds: day.availableBeds,
      availableVehicles: day.availableVehicles,
      availableCoaches: day.availableCoaches,
      sessionSeats: day.sessionSeats,
      warningLevel: day.warningLevel
    })),
    reviews: row.reviews.map((review) => ({
      id: review.id,
      orderId: review.orderId,
      baseId: review.baseId,
      userId: review.userId || "",
      studentName: review.user?.name || "演示学员",
      rating: review.rating,
      content: review.content,
      tags: review.tags,
      status: review.status,
      createdAt: review.createdAt.toISOString()
    }))
  };
}

function mapPackage(row: PrismaPackage): CampPackageView {
  return {
    id: row.id,
    baseId: row.baseId,
    categoryId: row.categoryId,
    baseName: row.base.name,
    baseProvince: row.base.province,
    baseCity: row.base.city,
    name: row.name,
    slug: row.slug,
    licenseType: row.categoryId.replace("category_", "") || "C1",
    targetUsers: row.targetUsers,
    description: row.description,
    price: row.price,
    trainingFee: row.trainingFee,
    dormitoryFee: row.dormitoryFee,
    mealFee: row.mealFee,
    pickupFee: row.pickupFee,
    examFeeNote: row.examFeeNote,
    includesAccommodation: row.includesAccommodation,
    includesMeals: row.includesMeals,
    supportsPickup: row.supportsPickup,
    durationText: row.durationText,
    serviceItems: row.serviceItems,
    trainingPlan: ["资料核验", "分阶段训练", "训练进度记录", "考试预约提醒"],
    accommodationPlan: row.includesAccommodation ? "包含基础床位，升级房型另行核算。" : "可按基地规则另选住宿。",
    mealPlan: row.includesMeals ? "包含基础餐标，升级餐标另行核算。" : "可按天购买餐饮服务。",
    pickupPlan: row.supportsPickup ? "支持预约接站。" : "该班型暂不含接站。",
    registrationMaterials: ["身份证明材料", "体检相关材料", "报名确认单"],
    valueAddedServices: ["房型升级", "营养餐升级", "道路陪练", "企业培训报表"],
    notIncludedItems: row.notIncludedItems,
    refundRule: row.refundRule,
    complianceNote: row.complianceNote,
    remainingSeats: row.remainingSeats,
    status: row.status,
    sessions: row.sessions.map(mapSession)
  };
}

function mapOrder(row: PrismaOrder): OrderView {
  const items: OrderItemView[] = row.items.map((item) => ({
    id: item.id,
    type: item.type,
    name: item.name,
    amount: item.amount,
    description: item.description
  }));
  return {
    id: row.id,
    orderNo: row.orderNo,
    userId: row.userId || "",
    studentName: row.user?.name || "演示学员",
    phoneTail: row.user?.phone.slice(-4) || "0000",
    baseId: row.baseId,
    baseName: row.base.name,
    packageId: row.packageId,
    packageName: row.package.name,
    licenseType: row.package.categoryId.replace("category_", "") || "C1",
    accommodation: row.package.includesAccommodation,
    meals: row.package.includesMeals,
    pickup: row.package.supportsPickup,
    totalAmount: row.totalAmount,
    paidAmount: row.paidAmount,
    status: row.status,
    paymentStatus: row.paymentStatus,
    checkinStatus: row.checkinStatus,
    progressStatus: row.progressStatus,
    nextStep: "请按订单状态完成下一步事项。",
    items,
    timeline: [
      { time: row.createdAt.toISOString(), title: "订单创建", description: "系统生成订单并等待后续确认。" },
      { time: row.updatedAt.toISOString(), title: "状态更新", description: "订单状态已同步至平台后台。" }
    ],
    createdAt: row.createdAt.toISOString()
  };
}

export interface BaseFilters {
  province?: string;
  city?: string;
  licenseType?: string;
  accommodation?: string;
  meals?: string;
  pickup?: string;
  femaleDorm?: string;
  enterprise?: string;
  level?: string;
  verified?: string;
}

export async function listBases(filters: BaseFilters = {}) {
  const mock = getMockDataset();
  if (!isDatabaseConfigured()) {
    return filterBases(mock.bases, filters);
  }
  try {
    const rows = await prisma.trainingBase.findMany({
      include: baseInclude,
      orderBy: [{ verified: "desc" }, { rating: "desc" }]
    });
    return filterBases(rows.map(mapBase), filters);
  } catch {
    return filterBases(mock.bases, filters);
  }
}

export async function getBaseById(id: string) {
  const mock = getMockDataset();
  if (!isDatabaseConfigured()) {
    return mock.bases.find((base) => base.id === id || base.slug === id) ?? null;
  }
  try {
    const row = await prisma.trainingBase.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: baseInclude
    });
    return row ? mapBase(row) : mock.bases.find((base) => base.id === id || base.slug === id) ?? null;
  } catch {
    return mock.bases.find((base) => base.id === id || base.slug === id) ?? null;
  }
}

export async function listPackages(filters: { baseId?: string; licenseType?: string } = {}) {
  const mock = getMockDataset();
  if (!isDatabaseConfigured()) {
    return filterPackages(mock.packages, filters);
  }
  try {
    const rows = await prisma.campPackage.findMany({
      include: packageInclude,
      orderBy: [{ remainingSeats: "desc" }]
    });
    return filterPackages(rows.map(mapPackage), filters);
  } catch {
    return filterPackages(mock.packages, filters);
  }
}

export async function getPackageById(id: string) {
  const mock = getMockDataset();
  if (!isDatabaseConfigured()) {
    return mock.packages.find((item) => item.id === id || item.slug === id) ?? null;
  }
  try {
    const row = await prisma.campPackage.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: packageInclude
    });
    return row ? mapPackage(row) : mock.packages.find((item) => item.id === id || item.slug === id) ?? null;
  } catch {
    return mock.packages.find((item) => item.id === id || item.slug === id) ?? null;
  }
}

export async function listOrders() {
  const mock = getMockDataset();
  if (!isDatabaseConfigured()) return mock.orders;
  try {
    const rows = await prisma.order.findMany({
      include: orderInclude,
      orderBy: { createdAt: "desc" },
      take: 80
    });
    return rows.map(mapOrder);
  } catch {
    return mock.orders;
  }
}

export async function getOrderById(id: string) {
  const mock = getMockDataset();
  if (!isDatabaseConfigured()) {
    return mock.orders.find((order) => order.id === id || order.orderNo === id) ?? null;
  }
  try {
    const row = await prisma.order.findFirst({
      where: { OR: [{ id }, { orderNo: id }] },
      include: orderInclude
    });
    return row ? mapOrder(row) : mock.orders.find((order) => order.id === id || order.orderNo === id) ?? null;
  } catch {
    return mock.orders.find((order) => order.id === id || order.orderNo === id) ?? null;
  }
}

export async function getProgressList() {
  const mock = getMockDataset();
  if (!isDatabaseConfigured()) return mock.progress;
  try {
    const rows = await prisma.studentProgress.findMany({
      include: { order: { include: { base: true, package: true, user: true } } },
      orderBy: { updatedAt: "desc" },
      take: 50
    });
    return rows.map((row) => ({
      id: row.id,
      orderId: row.orderId,
      orderNo: row.order.orderNo,
      studentName: row.order.user?.name || "演示学员",
      baseName: row.order.base.name,
      packageName: row.order.package.name,
      currentStage: row.currentStage,
      theoryStatus: row.theoryStatus,
      fieldTrainingStatus: row.fieldTrainingStatus,
      roadTrainingStatus: row.roadTrainingStatus,
      examBookingNote: row.examBookingNote,
      nextStep: row.nextStep,
      teacherNote: row.teacherNote,
      managerNote: row.managerNote,
      updatedBy: row.updatedBy,
      updatedAt: row.updatedAt.toISOString()
    }));
  } catch {
    return mock.progress;
  }
}

export async function createApplication(input: {
  studentName: string;
  phone: string;
  province: string;
  city: string;
  targetLicenseType: string;
  baseId?: string;
  packageId?: string;
  needAccommodation: boolean;
  needMeals: boolean;
  needPickup: boolean;
  expectedArrivalDate?: string;
  isEnterprise: boolean;
  enterpriseName?: string;
  enterpriseSize?: number;
  note?: string;
}) {
  const risk = detectRisk(input.note);
  if (risk.blocked) {
    return { ok: false as const, risk, application: null };
  }
  if (!isDatabaseConfigured()) {
    const application: ApplicationView = {
      id: `application_${Date.now()}`,
      ...input,
      expectedArrivalDate: input.expectedArrivalDate,
      status: risk.riskFlag ? "RISK_REVIEW" : "SUBMITTED",
      riskFlag: risk.riskFlag,
      createdAt: new Date().toISOString()
    };
    return { ok: true as const, risk, application };
  }
  try {
    const application = await prisma.application.create({
      data: {
        studentName: input.studentName,
        phone: input.phone,
        province: input.province,
        city: input.city,
        targetLicenseType: input.targetLicenseType,
        baseId: input.baseId || null,
        packageId: input.packageId || null,
        needAccommodation: input.needAccommodation,
        needMeals: input.needMeals,
        needPickup: input.needPickup,
        expectedArrivalDate: input.expectedArrivalDate ? new Date(input.expectedArrivalDate) : null,
        isEnterprise: input.isEnterprise,
        enterpriseName: input.enterpriseName || null,
        enterpriseSize: input.enterpriseSize || null,
        note: input.note || null,
        status: risk.riskFlag ? "RISK_REVIEW" : "SUBMITTED",
        riskFlag: risk.riskFlag
      }
    });
    if (risk.riskFlag) {
      await recordRiskEvent("APPLICATION", application.id, input.note || "", risk.keywords[0], risk.level);
    }
    return { ok: true as const, risk, application };
  } catch {
    return { ok: false as const, risk, application: null };
  }
}

export async function createOrder(input: { applicationId?: string; baseId: string; packageId: string; userId?: string }) {
  const mock = getMockDataset();
  const pack = mock.packages.find((item) => item.id === input.packageId || item.slug === input.packageId) ?? mock.packages[0];
  const base = mock.bases.find((item) => item.id === input.baseId || item.slug === input.baseId) ?? mock.bases[0];
  if (!isDatabaseConfigured()) {
    return {
      ok: true as const,
      order: {
        ...mock.orders[0],
        id: `order_${Date.now()}`,
        orderNo: `DL${Date.now()}`,
        baseId: base.id,
        baseName: base.name,
        packageId: pack.id,
        packageName: pack.name,
        totalAmount: pack.price
      }
    };
  }
  try {
    const order = await prisma.order.create({
      data: {
        orderNo: `DL${Date.now()}`,
        userId: input.userId || null,
        applicationId: input.applicationId || null,
        baseId: input.baseId,
        packageId: input.packageId,
        totalAmount: pack.price,
        paidAmount: 0,
        status: "PENDING_MATERIALS",
        paymentStatus: "UNPAID",
        checkinStatus: "NOT_ARRIVED",
        progressStatus: "MATERIAL_REVIEW",
        items: {
          create: createOrderItemsForDb(pack)
        }
      },
      include: orderInclude
    });
    return { ok: true as const, order: mapOrder(order) };
  } catch {
    return { ok: false as const, order: null };
  }
}

function createOrderItemsForDb(pack: CampPackageView) {
  return [
    { type: "TRAINING" as const, name: "培训服务", amount: pack.trainingFee, description: "训练排班、教练服务、进度跟踪。" },
    { type: "DORMITORY" as const, name: "住宿服务", amount: pack.dormitoryFee, description: "按班型约定和实际入住核算。" },
    { type: "MEAL" as const, name: "餐饮服务", amount: pack.mealFee, description: "按餐标和实际选择核算。" },
    { type: "PICKUP" as const, name: "接站服务", amount: pack.pickupFee, description: "按预约接站服务核算。" }
  ].filter((item) => item.amount > 0);
}

export async function createFranchiseApplication(input: {
  schoolName: string;
  province: string;
  city: string;
  licenseNo: string;
  filingNo: string;
  trainingFieldAddress: string;
  trainingFieldArea: number;
  coachCount: number;
  vehicleCount: number;
  licenseTypes: string;
  hasDormitory: boolean;
  bedCount: number;
  hasCanteen: boolean;
  canteenCapacity: number;
  supportsPickup: boolean;
  supportsFemaleDorm: boolean;
  safetyDescription: string;
  foodSafetyDescription: string;
  priceDescription: string;
  contractDescription: string;
  refundDescription: string;
  canServeNationalStudents: boolean;
  contactName: string;
  contactPhone: string;
}) {
  const content = [
    input.safetyDescription,
    input.foodSafetyDescription,
    input.priceDescription,
    input.contractDescription,
    input.refundDescription
  ].join(" ");
  const risk = detectRisk(content);
  if (risk.blocked) return { ok: false as const, risk, application: null };
  if (!isDatabaseConfigured()) {
    return { ok: true as const, risk, application: { id: `franchise_${Date.now()}`, ...input } };
  }
  try {
    const application = await prisma.franchiseApplication.create({
      data: {
        ...input,
        licenseTypes: input.licenseTypes.split(/[,\s，、]+/).filter(Boolean),
        status: risk.riskFlag ? "RISK_REVIEW" : "SUBMITTED",
        riskFlag: risk.riskFlag
      }
    });
    if (risk.riskFlag) await recordRiskEvent("FRANCHISE", application.id, content, risk.keywords[0], risk.level);
    return { ok: true as const, risk, application };
  } catch {
    return { ok: false as const, risk, application: null };
  }
}

export async function recordRiskEvent(
  sourceType: "APPLICATION" | "FRANCHISE" | "PACKAGE" | "REVIEW" | "COMPLAINT" | "REFUND" | "BACKOFFICE",
  sourceId: string,
  content: string,
  keyword: string,
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
) {
  if (!isDatabaseConfigured()) {
    const event: RiskEventView = {
      id: `risk_${Date.now()}`,
      sourceType,
      sourceId,
      keyword,
      contentSnippet: riskSnippet(content, keyword),
      riskLevel,
      status: riskLevel === "HIGH" || riskLevel === "CRITICAL" ? "BLOCKED" : "OPEN",
      createdAt: new Date().toISOString()
    };
    return event;
  }
  return prisma.riskEvent.create({
    data: {
      sourceType,
      sourceId,
      keyword,
      contentSnippet: riskSnippet(content, keyword),
      riskLevel,
      status: riskLevel === "HIGH" || riskLevel === "CRITICAL" ? "BLOCKED" : "OPEN"
    }
  });
}

export async function getDashboard(scope: "admin" | "merchant" | "operator"): Promise<DashboardData> {
  if (scope === "merchant") return getMerchantDashboard();
  if (scope === "operator") return getOperatorDashboard();
  return getAdminDashboard();
}

function filterBases(bases: TrainingBaseView[], filters: BaseFilters) {
  return bases.filter((base) => {
    if (filters.province && base.province !== filters.province) return false;
    if (filters.city && !base.city.includes(filters.city)) return false;
    if (filters.accommodation === "true" && !base.supportsAccommodation) return false;
    if (filters.meals === "true" && !base.supportsMeals) return false;
    if (filters.pickup === "true" && !base.supportsPickup) return false;
    if (filters.femaleDorm === "true" && !base.supportsFemaleDorm) return false;
    if (filters.enterprise === "true" && !base.supportsEnterpriseTraining) return false;
    if (filters.level && base.level !== filters.level) return false;
    if (filters.verified === "true" && !base.verified) return false;
    return true;
  });
}

function filterPackages(packages: CampPackageView[], filters: { baseId?: string; licenseType?: string }) {
  return packages.filter((pack) => {
    if (filters.baseId && pack.baseId !== filters.baseId) return false;
    if (filters.licenseType && pack.licenseType !== filters.licenseType) return false;
    return true;
  });
}
