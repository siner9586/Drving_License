import { z } from "zod";
import { COMPLIANCE_CONFIRMATION, LICENSE_TYPES } from "@/lib/constants";

const licenseType = z.enum(LICENSE_TYPES);

export const applicationSchema = z.object({
  studentName: z.string().min(2, "请输入姓名"),
  phone: z.string().min(7, "请输入手机号"),
  province: z.string().min(1, "请选择省份"),
  city: z.string().min(1, "请输入城市"),
  targetLicenseType: licenseType,
  baseId: z.string().optional(),
  packageId: z.string().optional(),
  needAccommodation: z.coerce.boolean().default(false),
  needMeals: z.coerce.boolean().default(false),
  needPickup: z.coerce.boolean().default(false),
  expectedArrivalDate: z.string().optional(),
  isEnterprise: z.coerce.boolean().default(false),
  enterpriseName: z.string().optional(),
  enterpriseSize: z.coerce.number().optional(),
  note: z.string().max(500).optional(),
  agreeRules: z.coerce.boolean().refine(Boolean, "请同意用户协议"),
  agreePrivacy: z.coerce.boolean().refine(Boolean, "请同意隐私政策"),
  complianceConfirmation: z.literal(COMPLIANCE_CONFIRMATION)
});

export const enterpriseLeadSchema = z.object({
  companyName: z.string().min(2),
  contactName: z.string().min(2),
  phone: z.string().min(7),
  province: z.string().min(1),
  city: z.string().min(1),
  studentCount: z.coerce.number().min(1),
  targetLicenseType: licenseType,
  needAccommodation: z.coerce.boolean().default(false),
  needMeals: z.coerce.boolean().default(false),
  expectedTrainingDate: z.string().optional(),
  note: z.string().max(500).optional()
});

export const franchiseSchema = z.object({
  schoolName: z.string().min(2),
  province: z.string().min(1),
  city: z.string().min(1),
  licenseNo: z.string().min(4),
  filingNo: z.string().min(4),
  trainingFieldAddress: z.string().min(4),
  trainingFieldArea: z.coerce.number().min(1),
  coachCount: z.coerce.number().min(1),
  vehicleCount: z.coerce.number().min(1),
  licenseTypes: z.string().min(1),
  hasDormitory: z.coerce.boolean().default(false),
  bedCount: z.coerce.number().min(0),
  hasCanteen: z.coerce.boolean().default(false),
  canteenCapacity: z.coerce.number().min(0),
  supportsPickup: z.coerce.boolean().default(false),
  supportsFemaleDorm: z.coerce.boolean().default(false),
  safetyDescription: z.string().min(8),
  foodSafetyDescription: z.string().min(8),
  priceDescription: z.string().min(8),
  contractDescription: z.string().min(8),
  refundDescription: z.string().min(8),
  canServeNationalStudents: z.coerce.boolean().default(false),
  contactName: z.string().min(2),
  contactPhone: z.string().min(7)
});

export const complaintSchema = z.object({
  orderId: z.string().min(1),
  baseId: z.string().min(1),
  type: z.string().min(1),
  content: z.string().min(5).max(800)
});

export const refundSchema = z.object({
  orderId: z.string().min(1),
  reason: z.string().min(5).max(800),
  requestedAmount: z.coerce.number().min(1)
});

export const reviewSchema = z.object({
  orderId: z.string().min(1),
  baseId: z.string().min(1),
  rating: z.coerce.number().min(1).max(5),
  content: z.string().min(5).max(500),
  tags: z.string().optional()
});
