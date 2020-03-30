import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql"
import { ApolloContext } from "../models/interface"
export type Maybe<T> = T | null
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
	{ [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string
	String: string
	Boolean: boolean
	Int: number
	Float: number
	Date: Date
}

export type IAdditionalEntityFields = {
	path?: Maybe<Scalars["String"]>
	type?: Maybe<Scalars["String"]>
}

export type ICategory = {
	__typename?: "Category"
	_id: Scalars["ID"]
	name: Scalars["String"]
	slug: Scalars["String"]
	parent: Scalars["String"]
	createdAt: Scalars["Date"]
	updatedAt: Scalars["Date"]
}

export type IDecodedUser = {
	__typename?: "DecodedUser"
	_id: Scalars["String"]
	name: Scalars["String"]
	email: Scalars["String"]
}

export type IMutation = {
	__typename?: "Mutation"
	getSignedUrl: IS3Payload
	loginUser: IUser
	logoutUser: Scalars["String"]
	registerUser: IUser
	createStore: IStore
	updateStore?: Maybe<IStore>
}

export type IMutationGetSignedUrlArgs = {
	fileName: Scalars["String"]
	fileType: Scalars["String"]
}

export type IMutationLoginUserArgs = {
	password: Scalars["String"]
	email: Scalars["String"]
}

export type IMutationRegisterUserArgs = {
	password: Scalars["String"]
	email: Scalars["String"]
	name: Scalars["String"]
}

export type IMutationCreateStoreArgs = {
	data: IStoreCreateInput
}

export type IMutationUpdateStoreArgs = {
	data: IStoreUpdateInput
}

export type IQuery = {
	__typename?: "Query"
	verifyUser?: Maybe<IDecodedUser>
	readMyStore?: Maybe<IStore>
}

export type IQueryVerifyUserArgs = {
	required: Scalars["Boolean"]
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
	banner?: Maybe<Scalars["String"]>
	image?: Maybe<Scalars["String"]>
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
	banner?: Maybe<Scalars["String"]>
	image?: Maybe<Scalars["String"]>
	location?: Maybe<Scalars["String"]>
	tagline?: Maybe<Scalars["String"]>
}

export type IUser = {
	__typename?: "User"
	_id: Scalars["ID"]
	email: Scalars["String"]
	name: Scalars["String"]
	permissions: Array<Maybe<Scalars["String"]>>
	createdAt: Scalars["Date"]
	updatedAt: Scalars["Date"]
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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
	resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
	resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
	| SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
	| ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
	| SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes>

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = ResolversObject<{
	Query: ResolverTypeWrapper<{}>
	Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
	DecodedUser: ResolverTypeWrapper<IDecodedUser>
	String: ResolverTypeWrapper<Scalars["String"]>
	Store: ResolverTypeWrapper<IStore>
	ID: ResolverTypeWrapper<Scalars["ID"]>
	Date: ResolverTypeWrapper<Scalars["Date"]>
	Mutation: ResolverTypeWrapper<{}>
	S3Payload: ResolverTypeWrapper<IS3Payload>
	User: ResolverTypeWrapper<IUser>
	StoreCreateInput: IStoreCreateInput
	StoreUpdateInput: IStoreUpdateInput
	AdditionalEntityFields: IAdditionalEntityFields
	Category: ResolverTypeWrapper<ICategory>
}>

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = ResolversObject<{
	Query: {}
	Boolean: Scalars["Boolean"]
	DecodedUser: IDecodedUser
	String: Scalars["String"]
	Store: IStore
	ID: Scalars["ID"]
	Date: Scalars["Date"]
	Mutation: {}
	S3Payload: IS3Payload
	User: IUser
	StoreCreateInput: IStoreCreateInput
	StoreUpdateInput: IStoreUpdateInput
	AdditionalEntityFields: IAdditionalEntityFields
	Category: ICategory
}>

export type IUnionDirectiveArgs = {
	discriminatorField?: Maybe<Scalars["String"]>
	additionalFields?: Maybe<Array<Maybe<IAdditionalEntityFields>>>
}

export type IUnionDirectiveResolver<
	Result,
	Parent,
	ContextType = ApolloContext,
	Args = IUnionDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type IAbstractEntityDirectiveArgs = {
	discriminatorField: Scalars["String"]
	additionalFields?: Maybe<Array<Maybe<IAdditionalEntityFields>>>
}

export type IAbstractEntityDirectiveResolver<
	Result,
	Parent,
	ContextType = ApolloContext,
	Args = IAbstractEntityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type IEntityDirectiveArgs = {
	embedded?: Maybe<Scalars["Boolean"]>
	additionalFields?: Maybe<Array<Maybe<IAdditionalEntityFields>>>
}

export type IEntityDirectiveResolver<
	Result,
	Parent,
	ContextType = ApolloContext,
	Args = IEntityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type IColumnDirectiveArgs = { overrideType?: Maybe<Scalars["String"]> }

export type IColumnDirectiveResolver<
	Result,
	Parent,
	ContextType = ApolloContext,
	Args = IColumnDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type IIdDirectiveArgs = {}

export type IIdDirectiveResolver<
	Result,
	Parent,
	ContextType = ApolloContext,
	Args = IIdDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type ILinkDirectiveArgs = { overrideType?: Maybe<Scalars["String"]> }

export type ILinkDirectiveResolver<
	Result,
	Parent,
	ContextType = ApolloContext,
	Args = ILinkDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type IEmbeddedDirectiveArgs = {}

export type IEmbeddedDirectiveResolver<
	Result,
	Parent,
	ContextType = ApolloContext,
	Args = IEmbeddedDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type IMapDirectiveArgs = { path: Scalars["String"] }

export type IMapDirectiveResolver<
	Result,
	Parent,
	ContextType = ApolloContext,
	Args = IMapDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type ICategoryResolvers<
	ContextType = ApolloContext,
	ParentType extends IResolversParentTypes["Category"] = IResolversParentTypes["Category"]
> = ResolversObject<{
	_id?: Resolver<IResolversTypes["ID"], ParentType, ContextType>
	name?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	slug?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	parent?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	createdAt?: Resolver<IResolversTypes["Date"], ParentType, ContextType>
	updatedAt?: Resolver<IResolversTypes["Date"], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}>

export interface IDateScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes["Date"], any> {
	name: "Date"
}

export type IDecodedUserResolvers<
	ContextType = ApolloContext,
	ParentType extends IResolversParentTypes["DecodedUser"] = IResolversParentTypes["DecodedUser"]
> = ResolversObject<{
	_id?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	name?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	email?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}>

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
	loginUser?: Resolver<
		IResolversTypes["User"],
		ParentType,
		ContextType,
		RequireFields<IMutationLoginUserArgs, "password" | "email">
	>
	logoutUser?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	registerUser?: Resolver<
		IResolversTypes["User"],
		ParentType,
		ContextType,
		RequireFields<IMutationRegisterUserArgs, "password" | "email" | "name">
	>
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
}>

export type IQueryResolvers<
	ContextType = ApolloContext,
	ParentType extends IResolversParentTypes["Query"] = IResolversParentTypes["Query"]
> = ResolversObject<{
	verifyUser?: Resolver<
		Maybe<IResolversTypes["DecodedUser"]>,
		ParentType,
		ContextType,
		RequireFields<IQueryVerifyUserArgs, "required">
	>
	readMyStore?: Resolver<Maybe<IResolversTypes["Store"]>, ParentType, ContextType>
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
	banner?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>
	image?: Resolver<Maybe<IResolversTypes["String"]>, ParentType, ContextType>
	location?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	tagline?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	manager?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	createdAt?: Resolver<IResolversTypes["Date"], ParentType, ContextType>
	updatedAt?: Resolver<IResolversTypes["Date"], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}>

export type IUserResolvers<
	ContextType = ApolloContext,
	ParentType extends IResolversParentTypes["User"] = IResolversParentTypes["User"]
> = ResolversObject<{
	_id?: Resolver<IResolversTypes["ID"], ParentType, ContextType>
	email?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	name?: Resolver<IResolversTypes["String"], ParentType, ContextType>
	permissions?: Resolver<Array<Maybe<IResolversTypes["String"]>>, ParentType, ContextType>
	createdAt?: Resolver<IResolversTypes["Date"], ParentType, ContextType>
	updatedAt?: Resolver<IResolversTypes["Date"], ParentType, ContextType>
	__isTypeOf?: isTypeOfResolverFn<ParentType>
}>

export type IResolvers<ContextType = ApolloContext> = ResolversObject<{
	Category?: ICategoryResolvers<ContextType>
	Date?: GraphQLScalarType
	DecodedUser?: IDecodedUserResolvers<ContextType>
	Mutation?: IMutationResolvers<ContextType>
	Query?: IQueryResolvers<ContextType>
	S3Payload?: IS3PayloadResolvers<ContextType>
	Store?: IStoreResolvers<ContextType>
	User?: IUserResolvers<ContextType>
}>

export type IDirectiveResolvers<ContextType = ApolloContext> = ResolversObject<{
	union?: IUnionDirectiveResolver<any, any, ContextType>
	abstractEntity?: IAbstractEntityDirectiveResolver<any, any, ContextType>
	entity?: IEntityDirectiveResolver<any, any, ContextType>
	column?: IColumnDirectiveResolver<any, any, ContextType>
	id?: IIdDirectiveResolver<any, any, ContextType>
	link?: ILinkDirectiveResolver<any, any, ContextType>
	embedded?: IEmbeddedDirectiveResolver<any, any, ContextType>
	map?: IMapDirectiveResolver<any, any, ContextType>
}>

import { ObjectId } from "../models/interface"
export type IStoreDb = {
	_id: ObjectId
	name: string
	slug: string
	banner?: Maybe<string>
	image?: Maybe<string>
	location: string
	tagline: string
	manager: string
	createdAt: Date
	updatedAt: Date
}

export type IUserDb = {
	_id: ObjectId
	email: string
	name: string
	permissions: Array<Maybe<string>>
	createdAt: Date
	updatedAt: Date
	password: string
}

export type ICategoryDb = {
	_id: ObjectId
	name: string
	slug: string
	parent: string
	createdAt: Date
	updatedAt: Date
}
