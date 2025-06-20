import { z } from 'zod';

// Filter schema
export const FilterSchema = z.object({
	value: z.string(),
	type: z.string(),
	count: z.number()
});

export type Filter = z.infer<typeof FilterSchema>;

// Pagination schema
export const PaginationSchema = z.object({
	count: z.number(),
	max: z.number(),
	offset: z.number(),
	sort: z.string(),
	order: z.string().nullable(),
	total: z.number(),
	currentUrl: z.string(),
	nextUrl: z.string().nullable(),
	previousUrl: z.string().nullable()
});

export type Pagination = z.infer<typeof PaginationSchema>;

// Meta schema
export const MetaSchema = z.object({
	status: z.number(),
	messages: z.array(z.unknown()),
	pagination: PaginationSchema,
	filters: z.array(FilterSchema),
	decoder: z.array(z.unknown())
});

export type Meta = z.infer<typeof MetaSchema>;

// Vehicle result schema
export const VehicleResultSchema = z.object({
	vehicleId: z.number(),
	parkIt: z.boolean(),
	parkOutSide: z.boolean(),
	overTheAirUpdate: z.boolean(),
	artemisId: z.number(),
	active: z.boolean(),
	ncapId: z.number().nullable(),
	modelYear: z.number(),
	make: z.string(),
	vehicleModel: z.string(),
	trim: z.string().nullable(),
	series: z.string().nullable(),
	class: z.string().nullable(),
	manufacturer: z.string(),
	vehiclePicture: z.string().nullable(),
	ncapRated: z.boolean(),
	complaintsCount: z.number(),
	recallsCount: z.number(),
	investigationsCount: z.number(),
	manufacturerCommunicationsCount: z.number()
});

export type VehicleResult = z.infer<typeof VehicleResultSchema>;

// Data schema
export const DataSchema = z.object({
	meta: MetaSchema,
	results: z.array(VehicleResultSchema)
});

export type Data = z.infer<typeof DataSchema>;

// API Response schema
export const ApiResponseSchema = z.object({
	isSuccess: z.boolean(),
	data: DataSchema,
	error: z.null()
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;

// Detailed vehicle types

// Safety Feature
export const SafetyFeatureSchema = z.object({
	label: z.string(),
	value: z.string(),
	notes: z.string().nullable()
});

export type SafetyFeature = z.infer<typeof SafetyFeatureSchema>;

// Safety Feature Category
export const SafetyFeatureCategorySchema = z.object({
	category: z.string(),
	notes: z.string().nullable(),
	features: z.array(SafetyFeatureSchema)
});

export type SafetyFeatureCategory = z.infer<typeof SafetyFeatureCategorySchema>;

// Crash Test Rating Detail
export const CrashTestRatingDetailSchema = z.object({
	position: z.string(),
	display: z.string(),
	rating: z.string(),
	notes: z.string().nullable(),
	safetyConcerns: z.string().nullable(),
	ratings: z.array(z.string()),
	possibility: z.string().nullable()
});

export type CrashTestRatingDetail = z.infer<typeof CrashTestRatingDetailSchema>;

// Crash Test Rating
export const CrashTestRatingSchema = z.object({
	type: z.string(),
	display: z.string(),
	mmy: z.string(),
	ncapVehicleId: z.number(),
	ratings: z.array(CrashTestRatingDetailSchema)
});

export type CrashTestRating = z.infer<typeof CrashTestRatingSchema>;

// Recommended Feature
export const RecommendedFeatureSchema = z.object({
	key: z.string(),
	label: z.string(),
	video: z.string().nullable(),
	icon: z.string().nullable(),
	type: z.string(),
	nhtsaEvaluation: z.string().nullable(),
	nhtsaComments: z.string().nullable(),
	description: z.string(),
	note: z.string().nullable()
});

export type RecommendedFeature = z.infer<typeof RecommendedFeatureSchema>;

// Safety Ratings
export const SafetyRatingsSchema = z.object({
	crashTestRatings: z.array(CrashTestRatingSchema).nullable(),
	safetyFeatures: z.array(SafetyFeatureCategorySchema).nullable(),
	recommendedFeatures: z.array(RecommendedFeatureSchema).nullable()
});

export type SafetyRatings = z.infer<typeof SafetyRatingsSchema>;

// Component
export const ComponentSchema = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string()
});

export type Component = z.infer<typeof ComponentSchema>;

// Complaint
export const ComplaintSchema = z.object({
	dateFiled: z.string(),
	dateOfIncident: z.string().nullable(),
	nhtsaIdNumber: z.number(),
	id: z.number(),
	numberOfInjuries: z.number(),
	numberOfDeaths: z.number(),
	fire: z.boolean(),
	crash: z.boolean(),
	vin: z.string().nullable(),
	consumerLocation: z.string().nullable(),
	description: z.string(),
	components: z.array(ComponentSchema),
	associatedDocumentsCount: z.number(),
	associatedDocuments: z.string().nullable(),
	associatedProductsCount: z.number(),
	associatedProducts: z.string().nullable()
});

export type Complaint = z.infer<typeof ComplaintSchema>;

// Recall
export const RecallSchema = z.object({
	id: z.number(),
	parkIt: z.boolean(),
	parkOutSide: z.boolean(),
	overTheAirUpdate: z.boolean(),
	manufacturer: z.string(),
	mfrCampaignNumber: z.string(),
	nhtsaCampaignNumber: z.string(),
	reportReceivedDate: z.string(),
	subject: z.string(),
	summary: z.string(),
	consequence: z.string(),
	correctiveAction: z.string(),
	potentialNumberOfUnitsAffected: z.number(),
	notes: z.string().nullable(),
	associatedDocumentsCount: z.number(),
	associatedDocuments: z.string().nullable(),
	associatedProductsCount: z.number(),
	associatedProducts: z.string().nullable(),
	components: z.array(ComponentSchema),
	investigations: z.array(z.any()).nullable()
});

export type Recall = z.infer<typeof RecallSchema>;

// Manufacturer Communication
export const ManufacturerCommunicationSchema = z.object({
	manufacturerCommunicationNumber: z.string(),
	nhtsaIdNumber: z.number(),
	subject: z.string(),
	summary: z.string(),
	communicationDate: z.string(),
	components: z.array(ComponentSchema),
	associatedDocumentsCount: z.number(),
	associatedDocuments: z.string().nullable(),
	associatedProductsCount: z.number(),
	associatedProducts: z.string().nullable()
});

export type ManufacturerCommunication = z.infer<typeof ManufacturerCommunicationSchema>;

// Safety Issues
export const SafetyIssuesSchema = z.object({
	complaints: z.array(ComplaintSchema).nullable(),
	recalls: z.array(RecallSchema).nullable(),
	investigations: z.array(z.any()).nullable(),
	manufacturerCommunications: z.array(ManufacturerCommunicationSchema).nullable()
});

export type SafetyIssues = z.infer<typeof SafetyIssuesSchema>;

// Detailed Vehicle Result
export const DetailedVehicleResultSchema = VehicleResultSchema.extend({
	safetyRatings: SafetyRatingsSchema.nullable(),
	safetyIssues: SafetyIssuesSchema.nullable()
});

export type DetailedVehicleResult = z.infer<typeof DetailedVehicleResultSchema>;

// Detailed Vehicle Response
export const DetailedVehicleResponseSchema = z.object({
	isSuccess: z.boolean(),
	data: z.object({
		meta: z.any(),
		results: z.array(DetailedVehicleResultSchema)
	}),
	error: z.null()
});

export type DetailedVehicleResponse = z.infer<typeof DetailedVehicleResponseSchema>;
