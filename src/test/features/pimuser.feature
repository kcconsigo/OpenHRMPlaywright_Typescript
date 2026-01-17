@Regressiontesting
Feature: Verify PIM User can be added successfully
        As an Admin user
        I want to Add PIM user on the Application

  Background:

  Scenario Outline: Admin Add Pim User successfully
    Given I am on the Pim tab
    When I select Employee Tab
    And I type Employee Details in EmpFirstName as "<firstName>" EmpMidName "<middleName>" EmpLastName "<lastName>" EmpID "<empID>" nationalityDropdown "<nationality>" and maritalDropdown "<maritalstatus>"

      | firstName | middleName | lastName     | empID | nationality | maritalstatus |
      | user1     | pass1      | successful   |       |             |               |
      | user2     | pass2      | unsuccessful |       |             |               |
    Then Employee details should be added as "<status>" message
    Examples:
      | status |
      | Successfully Saved |
