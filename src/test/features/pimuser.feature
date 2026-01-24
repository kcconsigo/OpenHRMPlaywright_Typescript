@Regressiontesting
Feature: Verify PIM User can be added successfully
        As an Admin user
        I want to Add PIM user on the Application

  Background:

  Scenario Outline: Admin Add Pim User successfully
    Given I am on the Pim tab
    When I select Add Employee Tab
    And I type Employee Details in EmpFirstName as "<firstName>" EmpMidName "<middleName>" EmpLastName "<lastName>" EmpID "<empID>"
      | firstName | middleName | lastName     | empID | nationality | maritalstatus |
      | user1     | pass1      | successful   |       |             |               |
      | user2     | pass2      | unsuccessful |       |             |               |
    When I click Save Button to save the details
    Then Employee details should be added and should see "Successfully Saved" message

