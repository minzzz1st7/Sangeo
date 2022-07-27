package com.ssafy.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.CounselorRegisterPostReq;
import com.ssafy.api.service.CounselorService;
import com.ssafy.db.entity.Counselor;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * 상담사 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "상담사 API", tags = { "Counselor" })
@RestController
@RequestMapping("/api/v1/counselors")
public class CounselorController {
	
	@Autowired
	CounselorService counselorService;
	
	@GetMapping("/{counselorId}")
	@ApiOperation(value = "상담사 정보 조회", notes = "<strong>아이디</strong>를 통해 상담사 정보를 조회한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "상담사 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<Counselor> search(
			@PathVariable("counselorId") @ApiParam(value = "조회할 상담사 아이디", required = true) String counselorId) {
		Counselor counselor = counselorService.getCounselorByCounselorId(counselorId);
		System.out.println(counselor.toString());
		return ResponseEntity.status(200).body(counselor);

	}

	@PostMapping()
	@ApiOperation(value = "상담사 가입", notes = "<strong>아이디, 패스워드, 이름, 전화번호, 프로필, 한줄 자기소개, 연락 가능 시작 시간, 연락 가능 종료 시간</strong>을 통해 상담사 가입을 한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "상담사 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<Counselor> register(
			@RequestBody @ApiParam(value = "상담사 가입 정보", required = true) CounselorRegisterPostReq registerInfo) {
		// 아이디 중복검사
		if (counselorService.getCounselorByCounselorId(registerInfo.getCounselorId()) == null) {
			System.out.println("가입가능한 아이디입니다.");
			// db에 registerInfo 저장
			Counselor counselor = counselorService.createCounselor(registerInfo);
			return ResponseEntity.status(200).body(counselor);
		} else {
			System.out.println("중복된 아이디입니다.");
			return ResponseEntity.status(401).body(null);
		}
	}

	@PutMapping()
	@ApiOperation(value = "상담사 정보 수정", notes = "<strong>패스워드, 이름, 전화번호, 프로필</strong>을 통해 상담사 정보를 수정한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "상담사 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<Counselor> update(
			@RequestBody @ApiParam(value = "수정할 상담사 정보", required = true) CounselorRegisterPostReq registerInfo) {
		Counselor counselor = counselorService.updateCounselor(registerInfo);
		return ResponseEntity.status(200).body(counselor);
	}

	@DeleteMapping("/{counselorId}")
	@ApiOperation(value = "상담사 정보 삭제", notes = "<strong>아이디</strong>를 통해 상담사 정보를 삭제한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "상담사 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<String> delete(
			@PathVariable("counselorId") @ApiParam(value = "삭제할 상담사 아이디", required = true) String counselorId) {
		counselorService.deleteCounselor(counselorId);
		return ResponseEntity.status(200).body("삭제 완료");

	}

}