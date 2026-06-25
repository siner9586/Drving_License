export type Role = "STUDENT" | "MERCHANT" | "OPERATOR" | "ADMIN";

export type BaseLevel = "A" | "B" | "C";
export type BaseStatus = "ACTIVE" | "FULL" | "PAUSED" | "SUSPENDED";
export type OrderStatus =
  | "PENDING_MATERIALS"
  | "PENDING_BASE_CONFIRM"
  | "PENDING_DEPOSIT"
  | "DEPOSIT_PAID"
  | "WAITING_CHECKIN"
  | "CHECKED_IN"
  | "STAYED_IN"
  | "TRAINING"
  | "EXAMING"
  | "COMPLETED"
  | "REFUNDING"
  | "REFUNDED"
  | "COMPLAINT"
  | "CLOSED";

export type ProgressStage =
  | "MATERIAL_REVIEW"
  | "BASE_CONFIRM"
  | "CHECKIN"
  | "STAY"
  | "THEORY"
  | "FIELD_TRAINING"
  | "ROAD_TRAINING"
  | "EXAM_BOOKING"
  | "COMPLETED";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface RegionView {
  id: string;
  name: string;
  code: string;
  type: "PROVINCE" | "CITY";
  parentId?: string;
}

export interface DormRoomView {
  id: string;
  roomType: string;
  capacity: number;
  totalRooms: number;
  availableRooms: number;
  pricePerDay: number;
  features: string[];
}

export interface DormitoryView {
  id: string;
  baseId: string;
  baseName: string;
  name: string;
  description: string;
  totalBeds: number;
  availableBeds: number;
  hasAirConditioning: boolean;
  hasPrivateBathroom: boolean;
  hasHotWater: boolean;
  hasLaundry: boolean;
  genderSeparated: boolean;
  hasAccessControl: boolean;
  managerOnDuty: boolean;
  pricePerDay: number;
  rules: string;
  rooms: DormRoomView[];
}

export interface MealPlanView {
  id: string;
  name: string;
  pricePerDay: number;
  meals: string[];
  description: string;
}

export interface CanteenView {
  id: string;
  baseId: string;
  baseName: string;
  name: string;
  description: string;
  dailyCapacity: number;
  mealCountPerDay: number;
  supportsHalal: boolean;
  supportsVegetarian: boolean;
  supportsEnterpriseMeal: boolean;
  foodSafetyNote: string;
  complaintChannel: string;
  mealPlans: MealPlanView[];
}

export interface CoachView {
  id: string;
  baseId: string;
  name: string;
  gender: string;
  years: number;
  licenseTypes: string[];
  tags: string[];
  rating: number;
  studentCount: number;
  complaintCount: number;
}

export interface VehicleView {
  id: string;
  baseId: string;
  plateNo: string;
  vehicleType: string;
  trainingType: string;
  status: string;
}

export interface CapacityDayView {
  id: string;
  baseId: string;
  date: string;
  newStudentCapacity: number;
  availableBeds: number;
  availableVehicles: number;
  availableCoaches: number;
  sessionSeats: number;
  warningLevel: "NORMAL" | "WATCH" | "WARNING" | "FULL";
}

export interface ReviewView {
  id: string;
  orderId: string;
  baseId: string;
  userId: string;
  studentName: string;
  rating: number;
  content: string;
  tags: string[];
  status: string;
  createdAt: string;
}

export interface TrainingBaseView {
  id: string;
  schoolId: string;
  name: string;
  slug: string;
  level: BaseLevel;
  province: string;
  city: string;
  address: string;
  summary: string;
  description: string;
  coverImage: string;
  verified: boolean;
  status: BaseStatus;
  trainingFieldArea: number;
  coachCount: number;
  vehicleCount: number;
  totalBeds: number;
  availableBeds: number;
  canteenCapacity: number;
  dailyStudentCapacity: number;
  monthlyStudentCapacity: number;
  supportsAccommodation: boolean;
  supportsMeals: boolean;
  supportsPickup: boolean;
  supportsFemaleDorm: boolean;
  supportsEnterpriseTraining: boolean;
  rating: number;
  complaintRate: number;
  refundRate: number;
  priceMin: number;
  priceMax: number;
  suitableUsers: string[];
  dormitories: DormitoryView[];
  canteens: CanteenView[];
  coaches: CoachView[];
  vehicles: VehicleView[];
  sessions: CampSessionView[];
  capacityCalendar: CapacityDayView[];
  reviews: ReviewView[];
}

export interface CampSessionView {
  id: string;
  packageId: string;
  baseId: string;
  startDate: string;
  endDate: string;
  capacity: number;
  remainingSeats: number;
  status: string;
}

export interface CampPackageView {
  id: string;
  baseId: string;
  categoryId: string;
  baseName: string;
  baseProvince: string;
  baseCity: string;
  name: string;
  slug: string;
  licenseType: string;
  targetUsers: string;
  description: string;
  price: number;
  trainingFee: number;
  dormitoryFee: number;
  mealFee: number;
  pickupFee: number;
  examFeeNote: string;
  includesAccommodation: boolean;
  includesMeals: boolean;
  supportsPickup: boolean;
  durationText: string;
  serviceItems: string[];
  trainingPlan: string[];
  accommodationPlan: string;
  mealPlan: string;
  pickupPlan: string;
  registrationMaterials: string[];
  valueAddedServices: string[];
  notIncludedItems: string[];
  refundRule: string;
  complianceNote: string;
  remainingSeats: number;
  status: string;
  sessions: CampSessionView[];
}

export interface ApplicationView {
  id: string;
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
  status: string;
  riskFlag: boolean;
  createdAt: string;
}

export interface OrderItemView {
  id: string;
  type: string;
  name: string;
  amount: number;
  description: string;
}

export interface OrderTimelineItem {
  time: string;
  title: string;
  description: string;
}

export interface OrderView {
  id: string;
  orderNo: string;
  userId: string;
  studentName: string;
  phoneTail: string;
  baseId: string;
  baseName: string;
  packageId: string;
  packageName: string;
  licenseType: string;
  accommodation: boolean;
  meals: boolean;
  pickup: boolean;
  totalAmount: number;
  paidAmount: number;
  status: OrderStatus;
  paymentStatus: string;
  checkinStatus: string;
  progressStatus: ProgressStage;
  nextStep: string;
  items: OrderItemView[];
  timeline: OrderTimelineItem[];
  createdAt: string;
}

export interface StudentProgressView {
  id: string;
  orderId: string;
  orderNo: string;
  studentName: string;
  baseName: string;
  packageName: string;
  currentStage: ProgressStage;
  theoryStatus: string;
  fieldTrainingStatus: string;
  roadTrainingStatus: string;
  examBookingNote: string;
  nextStep: string;
  teacherNote: string;
  managerNote: string;
  updatedBy: string;
  updatedAt: string;
}

export interface ComplaintView {
  id: string;
  orderId: string;
  orderNo: string;
  studentName: string;
  baseId: string;
  baseName: string;
  type: string;
  severity: string;
  content: string;
  status: string;
  resolution: string;
}

export interface RefundView {
  id: string;
  orderId: string;
  orderNo: string;
  studentName: string;
  reason: string;
  requestedAmount: number;
  approvedAmount: number;
  status: string;
  note: string;
}

export interface FranchiseApplicationView {
  id: string;
  schoolName: string;
  province: string;
  city: string;
  licenseNo: string;
  filingNo: string;
  trainingFieldAddress: string;
  trainingFieldArea: number;
  coachCount: number;
  vehicleCount: number;
  licenseTypes: string[];
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
  status: string;
  riskFlag: boolean;
}

export interface FranchiseAuditView {
  id: string;
  applicationId: string;
  stage: string;
  status: string;
  auditor: string;
  note: string;
}

export interface EnterpriseLeadView {
  id: string;
  companyName: string;
  contactName: string;
  phone: string;
  province: string;
  city: string;
  studentCount: number;
  targetLicenseType: string;
  needAccommodation: boolean;
  needMeals: boolean;
  expectedTrainingDate: string;
  note: string;
  status: string;
}

export interface RiskEventView {
  id: string;
  sourceType: string;
  sourceId: string;
  keyword: string;
  contentSnippet: string;
  riskLevel: RiskLevel;
  status: string;
  createdAt: string;
}

export interface PlatformRuleView {
  id: string;
  type: string;
  title: string;
  content: string;
  version: string;
  published: boolean;
  updatedAt: string;
}

export interface DashboardData {
  metrics: Array<{ label: string; value: string; helper: string }>;
  bases: TrainingBaseView[];
  orders: OrderView[];
  complaints: ComplaintView[];
  refunds: RefundView[];
  franchiseApplications: FranchiseApplicationView[];
  franchiseAudits: FranchiseAuditView[];
  riskEvents: RiskEventView[];
  enterpriseLeads: EnterpriseLeadView[];
  rules: PlatformRuleView[];
}

export interface MockDataset {
  regions: RegionView[];
  bases: TrainingBaseView[];
  packages: CampPackageView[];
  dormitories: DormitoryView[];
  canteens: CanteenView[];
  applications: ApplicationView[];
  orders: OrderView[];
  progress: StudentProgressView[];
  complaints: ComplaintView[];
  refunds: RefundView[];
  reviews: ReviewView[];
  franchiseApplications: FranchiseApplicationView[];
  franchiseAudits: FranchiseAuditView[];
  enterpriseLeads: EnterpriseLeadView[];
  riskEvents: RiskEventView[];
  rules: PlatformRuleView[];
}
