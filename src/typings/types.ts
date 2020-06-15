import {
	GraphQLResolveInfo,
	GraphQLScalarType,
	GraphQLScalarTypeConfig,
} from "graphql"
import { ApolloContext } from "../models/interface"
export type Maybe<T> = T | null
export type RequireFields<T, K extends keyof T> = {
	[X in Exclude<keyof T, K>]?: T[X]
} &
	{ [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
	/** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
	JSONObject: any
	/** A date and time, represented as an ISO-8601 string */
	Date: Date
	/** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
	JSON: any
	/** The `Upload` scalar type represents a file upload. */
	Upload: any
}

export type IAuthResponse = {
	__typename?: "AuthResponse"
	user: IUser
	token: Scalars["String"]
	profile?: Maybe<Scalars["JSON"]>
}

export enum ICacheControlScope {
	Public = "PUBLIC",
	Private = "PRIVATE",
}

export type IMutation = {
	__typename?: "Mutation"
	getSignedUrl: IS3Payload
	registerUser: IAuthResponse
	loginUser: IAuthResponse
	logoutUser: Scalars["String"]
	createStore: IStore
	updateStore?: Maybe<IStore>
	createProduct: IProduct
	updateProduct: IProduct
	createOrder: IOrder
	updateOrder: IOrder
	updateCart: Array<Scalars["JSONObject"]>
}

export type IMutationGetSignedUrlArgs = {
	fileName: Scalars["String"]
	fileType: Scalars["String"]
}

export type IMutationRegisterUserArgs = {
	password: Scalars["String"]
	email: Scalars["String"]
	name: Scalars["String"]
}

export type IMutationLoginUserArgs = {
	password: Scalars["String"]
	email: Scalars["String"]
}

export type IMutationCreateStoreArgs = {
	data: IStoreCreateInput
}

export type IMutationUpdateStoreArgs = {
	data: IStoreUpdateInput
}

export type IMutationCreateProductArgs = {
	data: Scalars["JSONObject"]
}

export type IMutationUpdateProductArgs = {
	id: Scalars["ID"]
	data: Scalars["JSONObject"]
}

export type IMutationCreateOrderArgs = {
	data: Scalars["JSONObject"]
}

export type IMutationUpdateOrderArgs = {
	id: Scalars["ID"]
	data: Scalars["JSONObject"]
}

export type IMutationUpdateCartArgs = {
	data: Array<Scalars["JSONObject"]>
}

export type IOrder = {
	__typename?: "Order"
	_id: Scalars["ID"]
	orderNo: Scalars["Int"]
	amount: Scalars["Float"]
	quantity: Scalars["Int"]
	color: Scalars["String"]
	size: Scalars["String"]
	personalization: Scalars["String"]
	details?: Maybe<Scalars["JSON"]>
	status: Scalars["String"]
	verified: Scalars["Boolean"]
	product: IProduct
	store: IStore
	placedBy: IUser
	createdAt: Scalars["Date"]
	updatedAt: Scalars["Date"]
}

export type IProduct = {
	__typename?: "Product"
	_id: Scalars["ID"]
	name: Scalars["String"]
	images: Array<Scalars["String"]>
	price: Scalars["Float"]
	discount: Scalars["Float"]
	category: Scalars["String"]
	description: Scalars["String"]
	sizes: Array<Scalars["String"]>
	colors: Array<Scalars["String"]>
	store: IStore
	renewalType: Scalars["String"]
	expiresAt: Scalars["Date"]
	inStock: Scalars["Int"]
	createdAt: Scalars["Date"]
	updatedAt: Scalars["Date"]
}

export type IQuery = {
	__typename?: "Query"
	validateCart: Array<IProduct>
	verifyUser?: Maybe<IUser>
	readMyStore?: Maybe<IStore>
	getProductById?: Maybe<IProduct>
	getMyProducts: Array<IProduct>
	getProducts: Array<IProduct>
	getOrders: Array<IOrder>
}

export type IQueryValidateCartArgs = {
	data: Array<Scalars["JSONObject"]>
}

export type IQueryVerifyUserArgs = {
	required?: Maybe<Scalars["Boolean"]>
}

export type IQueryGetProductByIdArgs = {
	id: Scalars["String"]
}

export type IQueryGetMyProductsArgs = {
	query?: Maybe<Scalars["JSON"]>
}

export type IQueryGetProductsArgs = {
	query?: Maybe<Scalars["JSON"]>
	limit?: Maybe<Scalars["Int"]>
	offset?: Maybe<Scalars["Int"]>
	sort?: Maybe<Scalars["JSON"]>
}

export type IQueryGetOrdersArgs = {
	query?: Maybe<Scalars["JSON"]>
}

export type IReview = {
	__typename?: "Review"
	_id: Scalars["ID"]
	reviewer: Scalars["String"]
	product: Scalars["String"]
	rating: Scalars["Int"]
	review: Scalars["String"]
	editCount: Scalars["Int"]
	createdAt: Scalars["Date"]
	updatedAt: Scalars["Date"]
}

export type IS3Payload = {
	__typename?: "S3Payload"
	signedRequest: Scalars["String"]
	url: Scalars["String"]
}

export type IStore = {
	__typename?: "Store"
	_id: Scalars["ID"]
	name: Scalars["String"]
	slug: Scalars["String"]
	logo?: Maybe<Scalars["String"]>
	banner?: Maybe<Scalars["String"]>
	location: Scalars["String"]
	tagline: Scalars["String"]
	manager: Scalars["String"]
	createdAt: Scalars["Date"]
	updatedAt: Scalars["Date"]
}

export type IStoreCreateInput = {
	name: Scalars["String"]
	location: Scalars["String"]
	tagline: Scalars["String"]
}

export type IStoreUpdateInput = {
	name?: Maybe<Scalars["String"]>
	logo?: Maybe<Scalars["String"]>
	banner?: Maybe<Scalars["String"]>
	location?: Maybe<Scalars["String"]>
	tagline?: Maybe<Scalars["String"]>
}

export type IUser = {
	__typename?: "User"
	_id: Scalars["ID"]
	name: Scalars["String"]
	email: Scalars["String"]
	permissions: Array<Scalars["String"]>
	store?: Maybe<IStore>
	createdAt: Scalars["Date"]
	updatedAt: Scalars["Date"]
	profile?: Maybe<Scalars["JSON"]>
}

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
	fragment: string
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ResolverFn<TResult, TParent, TContext, TArgs>
	| StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs
> {
	subscribe: SubscriptionSubscribeFn<
		{ [key in TKey]: TResult },
		TParent,
		TContext,
		TArgs
	>
	resolve?: SubscriptionResolveFn<
		TResult,
		{ [key in TKey]: TResult },
		TContext,
		TArgs
	>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
	TResult,
	TKey extends string,
	TParent,
	TContext,
	TArgs
> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
	TResult,
	TKey extends string,
	TParent = {},
	TContext = {},
	TArgs = {}
> =
	| ((
			...args: any[]
	  ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes>

export type isTypeOfResolverFn<T = {}> = (
	obj: T,
	info: GraphQLResolveInfo
) => boolean

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
	TResult = {},
	TParent = {},
	TContext = {},
	TArgs = {}
> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = ResolversObject<{
	Query: ResolverTypeWrapper<{}>
	JSONObject: ResolverTypeWrapper<Scalars["JSONObject"]>
	Product: ResolverTypeWrapper<IProduct>
	ID: ResolverTypeWrapper<Scalars["ID"]>
	String: ResolverTypeWrapper<Scalars["String"]>
	Float: ResolverTypeWrapper<Scalars["Float"]>
	Store: ResolverTypeWrapper<IStore>
	Date: ResolverTypeWrapper<Scalars["Date"]>
	Int: ResolverTypeWrapper<Scalars["Int"]>
	Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
	User: ResolverTypeWrapper<IUser>
	JSON: ResolverTypeWrapper<Scalars["JSON"]>
	Order: ResolverTypeWrapper<IOrder>
	Mutation: ResolverTypeWrapper<{}>
	S3Payload: ResolverTypeWrapper<IS3Payload>
	AuthResponse: ResolverTypeWrapper<IAuthResponse>
	StoreCreateInput: IStoreCreateInput
	StoreUpdateInput: IStoreUpdateInput
	Review: ResolverTypeWrapper<IReview>
	CacheControlScope: ICacheControlScope
	Upload: ResolverTypeWrapper<Scalars["Upload"]>
}>

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = ResolversObject<{
	Query: {}
	JSONObject: Scalars["JSONObject"]
	Product: IProduct
	ID: Scalars["ID"]
	String: Scalars["String"]
	Float: Scalars["Float"]
	Store: IStore
	Date: Scalars["Date"]
	Int: Scalars["Int"]
	Boolean: Scalars["Boolean"]
	User: IUser
	JSON: Scalars["JSON"]
	Order: IOrder
	Mutation: {}
	S3Payload: IS3Payload
	AuthResponse: IAuthResponse
	StoreCreateInput: IStoreCreateInput
	StoreUpdateInput: IStoreUpdateInput
	Review: IReview
	CacheControlScope: ICacheControlScope
	Upload: Scalars["Upload"]
}>

export type IAuthResponseResolvers<
	ContextType = ApolloContext,
	ParentType extends IResolversParentTypes["AuthResponse"] = IResolversParentTypes["AuthResponse"]
> = ResolversObject<{
	user?: Resolver<IResolversTypes["User"], ParentType, ContextType>
	token?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	profile?: Resolver<Maybe<IResolversTypes["JSON"]>, ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}>

export interface IDateScalarConfig
	extends GraphQLScalarTypeConfig<IResolversTypes["Date"], any> {
	name: "Date"
}

export interface IJsonScalarConfig
	extends GraphQLScalarTypeConfig<IResolversTypes["JSON"], any> {
	name: "JSON"
}

export interface IJsonObjectScalarConfig
	extends GraphQLScalarTypeConfig<IResolversTypes["JSONObject"], any> {
	name: "JSONObject"
}

export type IMutationResolvers<
	ContextType = ApolloContext,
	ParentType extends IResolversParentTypes["Mutation"] = IResolversParentTypes["Mutation"]
> = ResolversObject<{
	getSignedUrl?: Resolver<
		IResolversTypes["S3Payload"],
		ParentType,
		ContextType,
		RequireFields<IMutationGetSignedUrlArgs, "fileName" | "fileType">
	>
	registerUser?: Resolver<
		IResolversTypes["AuthResponse"],
		ParentType,
		ContextType,
		RequireFields<IMutationRegisterUserArgs, "password" | "email" | "name">
	>
	loginUser?: Resolver<
		IResolversTypes["AuthResponse"],
		ParentType,
		ContextType,
		RequireFields<IMutationLoginUserArgs, "password" | "email">
	>
	logoutUser?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	createStore?: Resolver<
		IResolversTypes["Store"],
		ParentType,
		ContextType,
		RequireFields<IMutationCreateStoreArgs, "data">
	>
	updateStore?: Resolver<
		Maybe<IResolversTypes["Store"]>,
		ParentType,
		ContextType,
		RequireFields<IMutationUpdateStoreArgs, "data">
	>
	createProduct?: Resolver<
		IResolversTypes["Product"],
		ParentType,
		ContextType,
		RequireFields<IMutationCreateProductArgs, "data">
	>
	updateProduct?: Resolver<
		IResolversTypes["Product"],
		ParentType,
		ContextType,
		RequireFields<IMutationUpdateProductArgs, "id" | "data">
	>
	createOrder?: Resolver<
		IResolversTypes["Order"],
		ParentType,
		ContextType,
		RequireFields<IMutationCreateOrderArgs, "data">
	>
	updateOrder?: Resolver<
		IResolversTypes["Order"],
		ParentType,
		ContextType,
		RequireFields<IMutationUpdateOrderArgs, "id" | "data">
	>
	updateCart?: Resolver<
		Array<IResolversTypes["JSONObject"]>,
		ParentType,
		ContextType,
		RequireFields<IMutationUpdateCartArgs, "data">
	>
}>

export type IOrderResolvers<
	ContextType = ApolloContext,
	ParentType extends IResolversParentTypes["Order"] = IResolversParentTypes["Order"]
> = ResolversObject<{
	_id?: Resolver<IResolversTypes["ID"], ParentType, ContextType>
	orderNo?: Resolver<IResolversTypes["Int"], ParentType, ContextType>
	amount?: Resolver<IResolversTypes["Float"], ParentType, ContextType>
	quantity?: Resolver<IResolversTypes["Int"], ParentType, ContextType>
	color?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	size?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	personalization?: Resolver<
		IResolversTypes["String"],
		ParentType,
		ContextType
	>
	details?: Resolver<Maybe<IResolversTypes["JSON"]>, ParentType, ContextType>
	status?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	verified?: Resolver<IResolversTypes["Boolean"], ParentType, ContextType>
	product?: Resolver<IResolversTypes["Product"], ParentType, ContextType>
	store?: Resolver<IResolversTypes["Store"], ParentType, ContextType>
	placedBy?: Resolver<IResolversTypes["User"], ParentType, ContextType>
	createdAt?: Resolver<IResolversTypes["Date"], ParentType, ContextType>
	updatedAt?: Resolver<IResolversTypes["Date"], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}>

export type IProductResolvers<
	ContextType = ApolloContext,
	ParentType extends IResolversParentTypes["Product"] = IResolversParentTypes["Product"]
> = ResolversObject<{
	_id?: Resolver<IResolversTypes["ID"], ParentType, ContextType>
	name?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	images?: Resolver<Array<IResolversTypes["String"]>, ParentType, ContextType>
	price?: Resolver<IResolversTypes["Float"], ParentType, ContextType>
	discount?: Resolver<IResolversTypes["Float"], ParentType, ContextType>
	category?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	description?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	sizes?: Resolver<Array<IResolversTypes["String"]>, ParentType, ContextType>
	colors?: Resolver<Array<IResolversTypes["String"]>, ParentType, ContextType>
	store?: Resolver<IResolversTypes["Store"], ParentType, ContextType>
	renewalType?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	expiresAt?: Resolver<IResolversTypes["Date"], ParentType, ContextType>
	inStock?: Resolver<IResolversTypes["Int"], ParentType, ContextType>
	createdAt?: Resolver<IResolversTypes["Date"], ParentType, ContextType>
	updatedAt?: Resolver<IResolversTypes["Date"], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}>

export type IQueryResolvers<
	ContextType = ApolloContext,
	ParentType extends IResolversParentTypes["Query"] = IResolversParentTypes["Query"]
> = ResolversObject<{
	validateCart?: Resolver<
		Array<IResolversTypes["Product"]>,
		ParentType,
		ContextType,
		RequireFields<IQueryValidateCartArgs, "data">
	>
	verifyUser?: Resolver<
		Maybe<IResolversTypes["User"]>,
		ParentType,
		ContextType,
		IQueryVerifyUserArgs
	>
	readMyStore?: Resolver<
		Maybe<IResolversTypes["Store"]>,
		ParentType,
		ContextType
	>
	getProductById?: Resolver<
		Maybe<IResolversTypes["Product"]>,
		ParentType,
		ContextType,
		RequireFields<IQueryGetProductByIdArgs, "id">
	>
	getMyProducts?: Resolver<
		Array<IResolversTypes["Product"]>,
		ParentType,
		ContextType,
		IQueryGetMyProductsArgs
	>
	getProducts?: Resolver<
		Array<IResolversTypes["Product"]>,
		ParentType,
		ContextType,
		RequireFields<IQueryGetProductsArgs, "limit" | "offset">
	>
	getOrders?: Resolver<
		Array<IResolversTypes["Order"]>,
		ParentType,
		ContextType,
		IQueryGetOrdersArgs
	>
}>

export type IReviewResolvers<
	ContextType = ApolloContext,
	ParentType extends IResolversParentTypes["Review"] = IResolversParentTypes["Review"]
> = ResolversObject<{
	_id?: Resolver<IResolversTypes["ID"], ParentType, ContextType>
	reviewer?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	product?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	rating?: Resolver<IResolversTypes["Int"], ParentType, ContextType>
	review?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	editCount?: Resolver<IResolversTypes["Int"], ParentType, ContextType>
	createdAt?: Resolver<IResolversTypes["Date"], ParentType, ContextType>
	updatedAt?: Resolver<IResolversTypes["Date"], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}>

export type IS3PayloadResolvers<
	ContextType = ApolloContext,
	ParentType extends IResolversParentTypes["S3Payload"] = IResolversParentTypes["S3Payload"]
> = ResolversObject<{
	signedRequest?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	url?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}>

export type IStoreResolvers<
	ContextType = ApolloContext,
	ParentType extends IResolversParentTypes["Store"] = IResolversParentTypes["Store"]
> = ResolversObject<{
	_id?: Resolver<IResolversTypes["ID"], ParentType, ContextType>
	name?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	slug?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	logo?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>
	banner?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>
	location?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	tagline?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	manager?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	createdAt?: Resolver<IResolversTypes["Date"], ParentType, ContextType>
	updatedAt?: Resolver<IResolversTypes["Date"], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}>

export interface IUploadScalarConfig
	extends GraphQLScalarTypeConfig<IResolversTypes["Upload"], any> {
	name: "Upload"
}

export type IUserResolvers<
	ContextType = ApolloContext,
	ParentType extends IResolversParentTypes["User"] = IResolversParentTypes["User"]
> = ResolversObject<{
	_id?: Resolver<IResolversTypes["ID"], ParentType, ContextType>
	name?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	email?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	permissions?: Resolver<
		Array<IResolversTypes["String"]>,
		ParentType,
		ContextType
	>
	store?: Resolver<Maybe<IResolversTypes["Store"]>, ParentType, ContextType>
	createdAt?: Resolver<IResolversTypes["Date"], ParentType, ContextType>
	updatedAt?: Resolver<IResolversTypes["Date"], ParentType, ContextType>
	profile?: Resolver<Maybe<IResolversTypes["JSON"]>, ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}>

export type IResolvers<ContextType = ApolloContext> = ResolversObject<{
	AuthResponse?: IAuthResponseResolvers<ContextType>
	Date?: GraphQLScalarType
	JSON?: GraphQLScalarType
	JSONObject?: GraphQLScalarType
	Mutation?: IMutationResolvers<ContextType>
	Order?: IOrderResolvers<ContextType>
	Product?: IProductResolvers<ContextType>
	Query?: IQueryResolvers<ContextType>
	Review?: IReviewResolvers<ContextType>
	S3Payload?: IS3PayloadResolvers<ContextType>
	Store?: IStoreResolvers<ContextType>
	Upload?: GraphQLScalarType
	User?: IUserResolvers<ContextType>
}>
