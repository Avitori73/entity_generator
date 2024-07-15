import { formatFiles } from './format'
import { extractTable } from './parser'

const ddl = `
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
`

formatFiles()
extractTable(ddl)
