export const ENTITY_JAVA = `
package jp.co.yamaha_motor.xm03.common.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.math.BigDecimal;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.HashCodeBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;

import jp.co.yamaha_motor.commons.core.util.DateUtil;
import jp.co.yamaha_motor.commons.yfc.utility.entity.IEntity;
import jp.co.yamaha_motor.xm03.common.builder.IBuilder;
{manyToOneImports}
import jp.co.yamaha_motor.xm03.common.utils.UuidGenerator;



/**
 * POJO for {Entity}
 * @author {author}
 */
public class {Entity} extends AbstractBaseEntity implements IEntity, java.io.Serializable, INullable {

    private static final long serialVersionUID = -1L;
 
    public static final String {ENTITY_ID}                                  = "{entityId}";
    {ENTITY_COLUMNS_STATIC}

    public static final String UPDATE_AUTHOR                                = "updateAuthor";
    public static final String UPDATE_DATE                                  = "updateDate";
    public static final String CREATE_AUTHOR                                = "createAuthor";
    public static final String CREATE_DATE                                  = "createDate";
    public static final String UPDATE_PROGRAM                               = "updateProgram";
    public static final String UPDATE_COUNTER                               = "updateCounter";

    {MANY_TO_ONE_STATIC}
    
    {ONE_TO_MANY_STATIC}

    private static Null{Entity} nullObject = null;

    // Fields
    private String     {entityId} = "";
    {entityColumnsFields}

    private String     updateAuthor;
    private Date       updateDate = DateUtil.getSysDate();
    private String     createAuthor;
    private Date       createDate = DateUtil.getSysDate();
    private String     updateProgram;
    private Integer    updateCounter = 0;

    {manyToOneFields}
    
    {oneToManyFields}

    // Constructors

    /** default constructor */
    protected {Entity}() {
    }

    /** full constructor */
    protected {Entity}(String {entityId}
                      {entityColumnsConstructorArg}
                      , String     updateAuthor
                      , Date       updateDate
                      , String     createAuthor
                      , Date       createDate
                      , String     updateProgram
                      , Integer    updateCounter
                      {manyToOneConstructorArg}
                      {oneToManyConstructorArg}
    ) {

        this.{entityId}                               = {entityId};
        {entityColumnsConstructorSet}

        this.updateAuthor                             = updateAuthor;
        this.updateDate                               = updateDate;
        this.createAuthor                             = createAuthor;
        this.createDate                               = createDate;
        this.updateProgram                            = updateProgram;
        this.updateCounter                            = updateCounter;

        {manyToOneConstructorSet}

        {oneToManyConstructorSet}
    }

    // Builder
    public static class Builder implements IBuilder<{Entity}>{

        private String     {entityId} = "";
        {builderEntityColumnsFields}

        private String     updateAuthor;
        private Date       updateDate = DateUtil.getSysDate();
        private String     createAuthor;
        private Date       createDate = DateUtil.getSysDate();
        private String     updateProgram;
        private Integer    updateCounter = 0;

        {builderManyToOneFields}

        {builderOneToManyFields}

        public Builder({builderManyToOneDaoArg}){
            {builderManyToOneDaoSet}
        }
        
        {builderManyToOneSetters}

        public Builder set{Entity}Id(String {entityId}) {
            this.{entityId} = {entityId};
            return this;
        }

        {builderEntityColumnsSetters}

        public Builder setUpdateAuthor(String updateAuthor) {
            this.updateAuthor = updateAuthor;
            return this;
        }

        public Builder setUpdateDate(Date updateDate) {
            this.updateDate = updateDate;
            return this;
        }

        public Builder setCreateAuthor(String createAuthor) {
            this.createAuthor = createAuthor;
            return this;
        }

        public Builder setCreateDate(Date createDate) {
            this.createDate = createDate;
            return this;
        }

        public Builder setUpdateProgram(String updateProgram) {
            this.updateProgram = updateProgram;
            return this;
        }

        public Builder setUpdateCounter(Integer updateCounter) {
            this.updateCounter = updateCounter;
            return this;
        }

        {builderOneToManySetters}

        public {Entity} build(){
            {Entity} result = new {Entity}();
            
            result.set{EntityId}("".equals(this.{entityId}) ? UuidGenerator.generateUUID() : this.{entityId});
            {builderEntityColumnsBuilds}

            result.setUpdateAuthor(this.updateAuthor);
            result.setUpdateDate(this.updateDate);
            result.setCreateAuthor(this.createAuthor);
            result.setCreateDate(this.createDate);
            result.setUpdateProgram(this.updateProgram);
            result.setUpdateCounter(this.updateCounter);

            {builderManyToOneBuilds}
            {builderOneToManyBuilds}

            return result;
        }
    }

    // Getters & Setters

    public String get{EntityId}() {
        return {entityId};
    }

    public void set{EntityId}(String {entityId}) {
        this.{entityId} = {entityId};
    }

    {entityColumnsSettersAndGetters}

    public String getUpdateAuthor() {
        return updateAuthor;
    }

    public void setUpdateAuthor(String updateAuthor) {
        this.updateAuthor = updateAuthor;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public String getCreateAuthor() {
        return createAuthor;
    }

    public void setCreateAuthor(String createAuthor) {
        this.createAuthor = createAuthor;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getUpdateProgram() {
        return updateProgram;
    }

    public void setUpdateProgram(String updateProgram) {
        this.updateProgram = updateProgram;
    }

    public Integer getUpdateCounter() {
        return updateCounter;
    }

    public void setUpdateCounter(Integer updateCounter) {
        this.updateCounter = updateCounter;
    }
    
    {oneToManySettersAndGetters}
    {manyToOneSettersAndGetters}

    public String toString() {
        return new ToStringBuilder(this)
            .append("{entityId}", get{EntityId}())
            .toString();
    }

    public boolean equals(Object other) {
        if ( (this == other ) ) return true;
        if ( !(other instanceof {Entity}) ) return false;
        {Entity} castOther = ({Entity}) other;
        return new EqualsBuilder()
            .append(this.get{EntityId}(), castOther.get{EntityId}())
            .isEquals();
    }

    public int hashCode() {
        return new HashCodeBuilder()
            .append(get{EntityId}())
            .toHashCode();
    }

    public void copyFields({Entity} entity){

        this.{entityId}                                   = entity.get{EntityId}();
        {entityColumnsCopyFields}

        this.updateAuthor                                 = entity.getUpdateAuthor();
        this.updateDate                                   = entity.getUpdateDate();
        this.createAuthor                                 = entity.getCreateAuthor();
        this.createDate                                   = entity.getCreateDate();
        this.updateProgram                                = entity.getUpdateProgram();
        this.updateCounter                                = entity.getUpdateCounter();

        {manyToOneCopyFields}

        {oneToManyCopyFields}
    }

    public boolean isNull() {
        return false;
    }

    public static {Entity} newNull() {
        if (nullObject == null) {
            nullObject = new Null{Entity}();
        }
        return nullObject;
    }
}
`

export const NULL_ENTITY_JAVA = `
package jp.co.yamaha_motor.xm03.common.entity;

/**
 * @author {author}
 *
 */
public class Null{Entity} extends {Entity} {

    public Null{Entity}() {

    }

    /**
     * @param dbId
     * @param navigatorSource
     */
    public Null{Entity}(String dbId, String navigatorSource) {

        this.set{EntityId}(dbId);
        this.setNavigatorSource(navigatorSource + getPrimaryKeyTraceInfo(this.get{EntityId}()));
    }

    @Override
    public boolean isNull() {
        return true;
    }
}


`
export const ENTITY_DAO_IMPL_JAVA = `
package jp.co.yamaha_motor.xm03.common.dao.impl;

import java.io.Serializable;

import org.hibernate.Criteria;

import jp.co.ccs.jail.dao.impl.AbstractHibernateDao;
import jp.co.yamaha_motor.xm03.common.dao.IBaseQueryDao;
import jp.co.yamaha_motor.xm03.common.dao.I{Entity}Dao;
import jp.co.yamaha_motor.xm03.common.entity.{Entity};

/**
 * @author {author}
 * The class describes object to access the table which name is {Entity}.
 * We must implement only methods independent on native SQL in this class.
 *
 * 
 * @spring.bean
 *   name="I{Entity}Dao"
 *   parent="AbstractHibernateCmmDbDao"
 */
public class {Entity}DaoImpl extends AbstractHibernateDao implements I{Entity}Dao,IBaseQueryDao<{Entity}> {

    /**
     * Return entity to restore
     *
     * @return {Entity}.class
     */
    protected Class getClazz() {
        return {Entity}.class;
    }

    /**
     * Return the primary key obtained from argument(entity).
     *
     * @param obj The instance of entity class
     * @return The instance of primary-key object
     */
    protected Serializable getPK(Object obj) {
        {Entity} entity = ({Entity})obj;
        return entity.get{EntityId}();
    }

    /**
     * Retrieve by Primary Key
     *
     * @param {entityId} {entityId}
     * @return {Entity} Class by specified {entityId}
     */
     public {Entity} get(String {entityId}) {
          return ({Entity})super.get({entityId});
     }

    /**
     * {Entity} Existing Check with specified {entityId}
     *
     * @param {entityId} {entityId}
     * @return true/false
     */
     public boolean isExist(String {entityId}) {
          if (get({entityId}) == null) {
               return false;
          }
          return true;
     }

    public Criteria buildCriteria() {
        return this.createCriteria();
    }

}
`
export const I_ENTITY_DAO_JAVA = `
package jp.co.yamaha_motor.xm03.common.dao;

import jp.co.ccs.jail.dao.IHibernateDao;
import jp.co.yamaha_motor.xm03.common.entity.{Entity};

/**
 * @author {author}
 * The interface to access the table which name is {Entity}.
 * In case of accessing this table, we must access using this interface.
 *
 */
public interface I{Entity}Dao extends IHibernateDao {
    /**
     * Retrieve by Primary Key
     *
     * @param {entityId} {entityId}
     * @return {Entity} Class by specified {entityId}
     */
     public {Entity} get(String {entityId});

    /**
     * {Entity} Existing Check with specified {entityId}
     *
     * @param {entityId} {entityId}
     * @return true/false
     */
     public boolean isExist(String {entityId});
}
`
export const ENTITY_HBM_XML = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-mapping PUBLIC
    "-//Hibernate/Hibernate Mapping DTD 3.0//EN"
    "http://hibernate.sourceforge.net/hibernate-mapping-3.0.dtd" >

<hibernate-mapping default-access="field">
<!-- Created by EntityGenerator-{version} -->

<class
    name="jp.co.yamaha_motor.xm03.common.entity.{Entity}"
    table="{table_name}"
    lazy="true"
>

    <id
        name="{entityId}"
        type="java.lang.String"
        column="{entity_id_}"
    >

        <generator class="assigned" />
    </id>

    <version
        name="updateCounter"
        type="java.lang.Integer"
        column="update_counter_"

    />

    <!-- Columns -->
    {ColumnsXML}

    <!-- Fixed Columns -->
    <property
        name="updateAuthor"
        type="java.lang.String"
        column="update_author_"
        length="40"
    />
    <property
        name="updateDate"
        type="java.sql.Timestamp"
        column="update_date_"
        length="35"
    />
    <property
        name="createAuthor"
        type="java.lang.String"
        column="create_author_"
        length="40"
    />
    <property
        name="createDate"
        type="java.sql.Timestamp"
        column="create_date_"
        length="35"
    />
    <property
        name="updateProgram"
        type="java.lang.String"
        column="update_program_"
        length="20"
    />


    <!-- Many To One -->
    {ManyToOneXML}
    
    <!-- Associations -->
    {OneToManyXML}
</class>
</hibernate-mapping>
`
