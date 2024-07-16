CREATE TABLE cmm_parts_campaign_list (							
	campaign_list_id_ varchar(40) NOT NULL DEFAULT ' '::character varying,						
	site_id_ varchar(40) NOT NULL DEFAULT ' '::character varying,						
	campaign_name_ varchar(40) NOT NULL,						
	campaign_description_ varchar(1000) NULL,						
	region_flag_ varchar(20) NOT NULL,						
	target_dealer_type_ varchar(20) NOT NULL,						
	update_author_ varchar(40) NOT NULL DEFAULT ' '::character varying,						
	update_date_ timestamptz NOT NULL,						
	create_author_ varchar(40) NOT NULL DEFAULT ' '::character varying,						
	create_date_ timestamptz NOT NULL,						
	update_program_ varchar(20) NOT NULL DEFAULT ' '::character varying,						
	update_counter_ int4 NOT NULL DEFAULT 0,						
	CONSTRAINT pk_campaign_list PRIMARY KEY (campaign_list_id_)						
);							

CREATE TABLE cmm_parts_campaign_supplier (	
	campaign_supplier_id_ varchar(40) NOT NULL DEFAULT ' '::character varying,
	site_id_ varchar(40) NOT NULL DEFAULT ' '::character varying,
	campaign_list_id_ varchar(40) NOT NULL DEFAULT ' '::character varying,
	supplier_id_ varchar(40) NOT NULL DEFAULT ' '::character varying,
	supplier_code_ varchar(20) NULL,
	supplier_name_ varchar(40) NULL,
	update_author_ varchar(40) NOT NULL DEFAULT ' '::character varying,
	update_date_ timestamptz NOT NULL,
	create_author_ varchar(40) NOT NULL DEFAULT ' '::character varying,
	create_date_ timestamptz NOT NULL,
	update_program_ varchar(20) NOT NULL DEFAULT ' '::character varying,
	update_counter_ int4 NOT NULL DEFAULT 0,
	CONSTRAINT pk_campaign_suppliers PRIMARY KEY (campaign_supplier_id_)
);	

CREATE TABLE cmm_parts_campaign_component (	
	campaign_component_id_ varchar(40) NOT NULL DEFAULT ' '::character varying,
	site_id_ varchar(40) NOT NULL DEFAULT ' '::character varying,
	campaign_list_id_ varchar(40) NOT NULL DEFAULT ' '::character varying,
	parts_code_ varchar(40) NOT NULL,
	parts_name_ varchar(40) NOT NULL,
	parts_id_ varchar(40) NOT NULL,
	start_date_ varchar(8) NOT NULL,
	end_date_ varchar(8) NOT NULL,
	main_condi_strategy_code_ varchar(40) NOT NULL,
	main_bonus_strategy_code_ varchar(40) NOT NULL,
	main_is_custom_ varchar(1) NOT NULL,
	addi_condi_strategy_code_ varchar(40) NULL,
	addi_bonus_strategy_code_ varchar(40) NULL,
	addi_is_custom_ varchar(1) NOT NULL,
	issuance_flag_ varchar(1) NOT NULL DEFAULT '1'::character varying,
	remark_ varchar(255) NULL,
	update_author_ varchar(40) NOT NULL DEFAULT ' '::character varying,
	update_date_ timestamptz NOT NULL,
	create_author_ varchar(40) NOT NULL DEFAULT ' '::character varying,
	create_date_ timestamptz NOT NULL,
	update_program_ varchar(20) NOT NULL DEFAULT ' '::character varying,
	update_counter_ int4 NOT NULL DEFAULT 0,
	CONSTRAINT pk_parts_campaign_component PRIMARY KEY (campaign_component_id_)
);		

CREATE TABLE cmm_main_reward_rule (
	main_reward_id_ varchar(40) DEFAULT ' '::character varying NOT NULL,
	site_id_ varchar(40) NOT NULL DEFAULT ' '::character varying,
	campaign_component_id_ varchar(40) DEFAULT ' '::character varying NOT NULL,
	level_ int4 NOT NULL,
	from_ numeric(18, 2) NULL,
	to_ numeric(18, 2) NULL,
	from_operator_ varchar(2) NULL,
	to_operator_ varchar(2) NULL,
	value_ numeric(18, 2) NULL,
	formula_ varchar(40) NULL,
	update_author_ varchar(40) DEFAULT ' '::character varying NOT NULL,
	update_date_ timestamptz NOT NULL,
	create_author_ varchar(40) DEFAULT ' '::character varying NOT NULL,
	create_date_ timestamptz NOT NULL,
	update_program_ varchar(20) DEFAULT ' '::character varying NOT NULL,
	update_counter_ int4 DEFAULT 0 NOT NULL,
	CONSTRAINT pk_cmm_main_reward_rule PRIMARY KEY (main_reward_id_)
);

CREATE TABLE cmm_additional_reward_rule (
	addi_reward_id_ varchar(40) DEFAULT ' '::character varying NOT NULL,
	site_id_ varchar(40) NOT NULL DEFAULT ' '::character varying,
	main_reward_id_ varchar(40) DEFAULT ' '::character varying NOT NULL,
	campaign_component_id_ varchar(40) DEFAULT ' '::character varying NOT NULL,
	level_ int4 NOT NULL,
	from_ numeric(18, 2) NULL,
	to_ numeric(18, 2) NULL,
	from_operator_ varchar(2) NULL,
	to_operator_ varchar(2) NULL,
	value_ numeric(18, 2) NULL,
	formula_ varchar(40) NULL,
	update_author_ varchar(40) DEFAULT ' '::character varying NOT NULL,
	update_date_ timestamptz NOT NULL,
	create_author_ varchar(40) DEFAULT ' '::character varying NOT NULL,
	create_date_ timestamptz NOT NULL,
	update_program_ varchar(20) DEFAULT ' '::character varying NOT NULL,
	update_counter_ int4 DEFAULT 0 NOT NULL,
	CONSTRAINT pk_cmm_additional_reward_rule PRIMARY KEY (addi_reward_id_)
);
