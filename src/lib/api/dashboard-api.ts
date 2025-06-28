/**
 * Types for dashboard analytics response
 */
export interface RecentRecall {
	reportReceivedDate: string;
	nhtsaId: string;
	manufacturer: string;
	subject: string;
	component: string;
	campaignNumber: string;
	recallType: string;
	potentiallyAffected: string;
	recallDescription: string;
	consequenceSummary: string;
	correctiveAction: string;
	parkOutsideAdvisory: string;
	doNotDriveAdvisory: string;
	completionRate: string;
}

export interface RecallsByManufacturer {
	manufacturer: string;
	recallCount: number;
}

export interface MostRecalledVehicle {
	manufacturer: string;
	recallCount: number;
	issueDescription: string;
}

export interface RecallsByYear {
	year: number;
	count: number;
}

export interface CrashTestPerformance {
	manufacturer: string;
	totalTests: number;
	passedTests: number;
	failedTests: number;
	passRate: number;
}

export interface RolloverResistanceData {
	manufacturer: string;
	model: string;
	weight: number;
	rolloverResistance: number;
}

export interface PaginationMeta {
	count: number;
	max: number;
	offset: number;
	sort: string;
	order: string | null;
	total: number;
	currentUrl: string;
	nextUrl: string | null;
	previousUrl: string | null;
}

export interface Meta {
	status: number;
	messages: string[];
	pagination: PaginationMeta;
	filters: any[];
	decoder: any[];
}

export interface DashboardAnalytics {
	meta?: Meta;
	recentRecalls: RecentRecall[];
	recallsByManufacturer?: RecallsByManufacturer[];
	mostRecalledVehicles?: MostRecalledVehicle[];
	recallsByYear?: RecallsByYear[];
	crashTestPerformance?: CrashTestPerformance[];
	rolloverResistanceData?: RolloverResistanceData[];
}

export interface DashboardAnalyticsResponse {
	isSuccess: boolean;
	data: DashboardAnalytics;
	error: string | null;
}

/**
 * Fetch dashboard analytics data including recent recalls
 * @param recentRecallsCount Number of recent recalls to fetch
 * @param topManufacturersCount Number of top manufacturers to fetch
 * @param mostRecalledVehiclesCount Number of most recalled vehicles to fetch
 * @returns Promise with the dashboard analytics data
 */
export async function getDashboardAnalytics(
	recentRecallsCount = 10,
	topManufacturersCount = 10,
	mostRecalledVehiclesCount = 5
): Promise<DashboardAnalyticsResponse> {
	try {
		const response = await fetch(
			`http://localhost:5276/api/dashboard/analytics?recentRecallsCount=${recentRecallsCount}&topManufacturersCount=${topManufacturersCount}&mostRecalledVehiclesCount=${mostRecalledVehiclesCount}`,
			{
				headers: {
					accept: 'text/plain'
				}
			}
		);

		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Error fetching dashboard analytics:', error);
		throw error;
	}
}
