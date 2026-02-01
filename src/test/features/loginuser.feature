@E2Etesting @ValidLogin
Feature: Verify Login page using valid credentials and invalid credentials
        As an Admin user
        I want to login to the page using valid credentials and invalid credentials

Background:
  @ValidLogin
  Scenario Outline: User logins in Page using valid credentials
    Given I am on the login page using credentials
    When I enter my "<username>" and "<password>" credentials
    And I click the Login button
    Then I should be logged in

    Examples:
      | username | password |
      | Admin    | admin123 |

  @InvalidLogin
  Scenario Outline: User logins in Page using invalid credentials
    Given I am on the login page using credentials
    When I enter my "<usernameInvalid>" and "<passwordInvalid>" credentials
    And I click the Login button
    Then I should not be login and see "Invalid credentials" error message for invalid credentials

    Examples:
      | usernameInvalid | passwordInvalid |
      | Admin#$(*@#     | *&@$#admin123   |

  @EmptyFieldsLogin
  Scenario Outline: User logins in Page using empty fields
    Given I am on the login page using credentials
    When I enter my "<usernameEmpty>" and "<passwordEmpty>" empty fields
    And I click the Login button
    Then I should not be login and see "Required" error message for empty fields

    Examples:
      | usernameEmpty | passwordEmpty |
      |               | admin123      |
      | Admin         |               |

    @EmptyFieldsLogin
  Scenario Outline: User logins in Page using empty fields
    Given I am on the login page using credentials
    When I enter my "<usernameEmpty>" and "<passwordEmpty>" for both empty fields
    And I click the Login button
    Then I should not be login and see "Required" error message for both empty fields

    Examples:
      | usernameEmpty | passwordEmpty |
      |               |               |
      |               |               |
