import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import PaginationControls from "../PaginationControls";
import { PaginationInfo } from "../../../types/search.types";

describe("PaginationControls", () => {
  let mockOnPageChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockOnPageChange = vi.fn();
  });

  const createPagination = (
    overrides: Partial<PaginationInfo> = {},
  ): PaginationInfo => ({
    currentPage: 0,
    pageSize: 6,
    totalPages: 5,
    totalElements: 30,
    hasNext: true,
    hasPrevious: false,
    ...overrides,
  });

  it("renders nothing when totalPages is 1", () => {
    const pagination = createPagination({ totalPages: 1 });
    const { container } = render(
      <PaginationControls
        pagination={pagination}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when totalElements is 0", () => {
    const pagination = createPagination({ totalElements: 0 });
    const { container } = render(
      <PaginationControls
        pagination={pagination}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders pagination controls when there are multiple pages", () => {
    const pagination = createPagination();
    render(
      <PaginationControls
        pagination={pagination}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(screen.getByText("Mostrando página 1 de 5")).toBeInTheDocument();
    expect(screen.getByText("(30 resultados en total)")).toBeInTheDocument();
  });

  it("renders all page numbers when totalPages <= 5", () => {
    const pagination = createPagination({ totalPages: 3 });
    render(
      <PaginationControls
        pagination={pagination}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders ellipsis for large page counts", () => {
    const pagination = createPagination({
      totalPages: 10,
      currentPage: 5,
    });
    render(
      <PaginationControls
        pagination={pagination}
        onPageChange={mockOnPageChange}
      />,
    );

    const ellipsis = screen.getAllByText("...");
    expect(ellipsis).toHaveLength(2); // Should have ellipsis on both sides
  });

  it("highlights current page correctly", () => {
    const pagination = createPagination({ currentPage: 2 });
    render(
      <PaginationControls
        pagination={pagination}
        onPageChange={mockOnPageChange}
      />,
    );

    const currentPageButton = screen.getByText("3"); // Page 3 (index 2)
    expect(currentPageButton).toHaveClass("bg-primaryBlue", "text-white");
  });

  it("disables previous button when on first page", () => {
    const pagination = createPagination({
      currentPage: 0,
      hasPrevious: false,
    });
    render(
      <PaginationControls
        pagination={pagination}
        onPageChange={mockOnPageChange}
      />,
    );

    const prevButton = screen.getByLabelText("Página anterior");
    expect(prevButton).toBeDisabled();
    expect(prevButton).toHaveClass(
      "bg-gray-100",
      "text-gray-400",
      "cursor-not-allowed",
    );
  });

  it("disables next button when on last page", () => {
    const pagination = createPagination({
      currentPage: 4,
      hasNext: false,
    });
    render(
      <PaginationControls
        pagination={pagination}
        onPageChange={mockOnPageChange}
      />,
    );

    const nextButton = screen.getByLabelText("Página siguiente");
    expect(nextButton).toBeDisabled();
    expect(nextButton).toHaveClass(
      "bg-gray-100",
      "text-gray-400",
      "cursor-not-allowed",
    );
  });

  it("calls onPageChange when page button is clicked", () => {
    const pagination = createPagination();
    render(
      <PaginationControls
        pagination={pagination}
        onPageChange={mockOnPageChange}
      />,
    );

    const page2Button = screen.getByText("2");
    fireEvent.click(page2Button);

    expect(mockOnPageChange).toHaveBeenCalledWith(1); // Page 2 (index 1)
  });

  it("calls onPageChange when previous button is clicked", () => {
    const pagination = createPagination({
      currentPage: 1,
      hasPrevious: true,
    });
    render(
      <PaginationControls
        pagination={pagination}
        onPageChange={mockOnPageChange}
      />,
    );

    const prevButton = screen.getByLabelText("Página anterior");
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(0);
  });

  it("calls onPageChange when next button is clicked", () => {
    const pagination = createPagination({
      currentPage: 1,
      hasNext: true,
    });
    render(
      <PaginationControls
        pagination={pagination}
        onPageChange={mockOnPageChange}
      />,
    );

    const nextButton = screen.getByLabelText("Página siguiente");
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("renders first and last page buttons for large page counts", () => {
    const pagination = createPagination({
      totalPages: 10,
      currentPage: 5,
    });
    render(
      <PaginationControls
        pagination={pagination}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(screen.getByText("Primera")).toBeInTheDocument();
    expect(screen.getByText("Última")).toBeInTheDocument();
  });

  it("does not render first and last page buttons for small page counts", () => {
    const pagination = createPagination({ totalPages: 3 });
    render(
      <PaginationControls
        pagination={pagination}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(screen.queryByText("Primera")).not.toBeInTheDocument();
    expect(screen.queryByText("Última")).not.toBeInTheDocument();
  });

  it("calls onPageChange when first page button is clicked", () => {
    const pagination = createPagination({
      totalPages: 10,
      currentPage: 5,
    });
    render(
      <PaginationControls
        pagination={pagination}
        onPageChange={mockOnPageChange}
      />,
    );

    const firstButton = screen.getByText("Primera");
    fireEvent.click(firstButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(0);
  });

  it("calls onPageChange when last page button is clicked", () => {
    const pagination = createPagination({
      totalPages: 10,
      currentPage: 5,
    });
    render(
      <PaginationControls
        pagination={pagination}
        onPageChange={mockOnPageChange}
      />,
    );

    const lastButton = screen.getByText("Última");
    fireEvent.click(lastButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(9); // Last page (index 9)
  });

  it("disables first page button when on first page", () => {
    const pagination = createPagination({
      totalPages: 10,
      currentPage: 0,
    });
    render(
      <PaginationControls
        pagination={pagination}
        onPageChange={mockOnPageChange}
      />,
    );

    const firstButton = screen.getByText("Primera");
    expect(firstButton).toHaveClass("text-gray-400", "cursor-not-allowed");
  });

  it("disables last page button when on last page", () => {
    const pagination = createPagination({
      totalPages: 10,
      currentPage: 9,
    });
    render(
      <PaginationControls
        pagination={pagination}
        onPageChange={mockOnPageChange}
      />,
    );

    const lastButton = screen.getByText("Última");
    expect(lastButton).toHaveClass("text-gray-400", "cursor-not-allowed");
  });

  it("handles zero totalElements correctly", () => {
    const pagination = createPagination({
      totalElements: 0,
      totalPages: 0,
    });
    const { container } = render(
      <PaginationControls
        pagination={pagination}
        onPageChange={mockOnPageChange}
      />,
    );

    expect(container.firstChild).toBeNull();
  });
});
